import { isPresent, isBlank, normalizeBool } from 'angular2/src/facade/lang';
import { EventEmitter, ObservableWrapper } from 'angular2/src/facade/async';
import { PromiseWrapper } from 'angular2/src/facade/promise';
import { StringMapWrapper, ListWrapper } from 'angular2/src/facade/collection';
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 */
export const VALID = "VALID";
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 */
export const INVALID = "INVALID";
/**
 * Indicates that a Control is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
export const PENDING = "PENDING";
export function isControl(control) {
    return control instanceof AbstractControl;
}
function _find(control, path) {
    if (isBlank(path))
        return null;
    if (!(path instanceof Array)) {
        path = path.split("/");
    }
    if (path instanceof Array && ListWrapper.isEmpty(path))
        return null;
    return path
        .reduce((v, name) => {
        if (v instanceof ControlGroup) {
            return isPresent(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof ControlArray) {
            var index = name;
            return isPresent(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
function toObservable(r) {
    return PromiseWrapper.isPromise(r) ? ObservableWrapper.fromPromise(r) : r;
}
/**
 *
 */
export class AbstractControl {
    constructor(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
    }
    get value() { return this._value; }
    get status() { return this._status; }
    get valid() { return this._status === VALID; }
    /**
     * Returns the errors of this control.
     */
    get errors() { return this._errors; }
    get pristine() { return this._pristine; }
    get dirty() { return !this.pristine; }
    get touched() { return this._touched; }
    get untouched() { return !this._touched; }
    get valueChanges() { return this._valueChanges; }
    get statusChanges() { return this._statusChanges; }
    get pending() { return this._status == PENDING; }
    markAsTouched() { this._touched = true; }
    markAsDirty({ onlySelf } = {}) {
        onlySelf = normalizeBool(onlySelf);
        this._pristine = false;
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    }
    markAsPending({ onlySelf } = {}) {
        onlySelf = normalizeBool(onlySelf);
        this._status = PENDING;
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.markAsPending({ onlySelf: onlySelf });
        }
    }
    setParent(parent) { this._parent = parent; }
    updateValueAndValidity({ onlySelf, emitEvent } = {}) {
        onlySelf = normalizeBool(onlySelf);
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        this._status = this._calculateStatus();
        if (this._status == VALID || this._status == PENDING) {
            this._runAsyncValidator(emitEvent);
        }
        if (emitEvent) {
            ObservableWrapper.callEmit(this._valueChanges, this._value);
            ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (isPresent(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    }
    _runValidator() {
        return isPresent(this.validator) ? this.validator(this) : null;
    }
    _runAsyncValidator(emitEvent) {
        if (isPresent(this.asyncValidator)) {
            this._status = PENDING;
            this._cancelExistingSubscription();
            var obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = ObservableWrapper.subscribe(obs, (res) => this.setErrors(res, { emitEvent: emitEvent }));
        }
    }
    _cancelExistingSubscription() {
        if (isPresent(this._asyncValidationSubscription)) {
            ObservableWrapper.dispose(this._asyncValidationSubscription);
        }
    }
    /**
     * Sets errors on a control.
     *
     * This is used when validations are run not automatically, but manually by the user.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ## Usage
     *
     * ```
     * var login = new Control("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.updateValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    setErrors(errors, { emitEvent } = {}) {
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._status = this._calculateStatus();
        if (emitEvent) {
            ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    }
    find(path) { return _find(this, path); }
    getError(errorCode, path = null) {
        var control = isPresent(path) && !ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (isPresent(control) && isPresent(control._errors)) {
            return StringMapWrapper.get(control._errors, errorCode);
        }
        else {
            return null;
        }
    }
    hasError(errorCode, path = null) {
        return isPresent(this.getError(errorCode, path));
    }
    get root() {
        let x = this;
        while (isPresent(x._parent)) {
            x = x._parent;
        }
        return x;
    }
    /** @internal */
    _updateControlsErrors() {
        this._status = this._calculateStatus();
        if (isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    }
    /** @internal */
    _initObservables() {
        this._valueChanges = new EventEmitter();
        this._statusChanges = new EventEmitter();
    }
    _calculateStatus() {
        if (isPresent(this._errors))
            return INVALID;
        if (this._anyControlsHaveStatus(PENDING))
            return PENDING;
        if (this._anyControlsHaveStatus(INVALID))
            return INVALID;
        return VALID;
    }
}
/**
 * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
 * validation state, which is determined by an optional validation function.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with {@link ControlGroup} and {@link ControlArray}.
 *
 * ## Usage
 *
 * By default, a `Control` is created for every `<input>` or other form component.
 * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
 * bound to a DOM element instead. This `Control` can be configured with a custom
 * validation function.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
export class Control extends AbstractControl {
    constructor(value = null, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this._value = value;
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this._initObservables();
    }
    /**
     * Set the value of the control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `Control`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `Control` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     */
    updateValue(value, { onlySelf, emitEvent, emitModelToViewChange } = {}) {
        emitModelToViewChange = isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        this._value = value;
        if (isPresent(this._onChange) && emitModelToViewChange)
            this._onChange(this._value);
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    }
    /**
     * @internal
     */
    _updateValue() { }
    /**
     * @internal
     */
    _anyControlsHaveStatus(status) { return false; }
    /**
     * Register a listener for change events.
     */
    registerOnChange(fn) { this._onChange = fn; }
}
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `ControlGroup` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
 * controls, but is of variable length.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
export class ControlGroup extends AbstractControl {
    constructor(controls, optionals = null, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._optionals = isPresent(optionals) ? optionals : {};
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Add a control to this group.
     */
    addControl(name, control) {
        this.controls[name] = control;
        control.setParent(this);
    }
    /**
     * Remove a control from this group.
     */
    removeControl(name) { StringMapWrapper.delete(this.controls, name); }
    /**
     * Mark the named control as non-optional.
     */
    include(controlName) {
        StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
    }
    /**
     * Mark the named control as optional.
     */
    exclude(controlName) {
        StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
    }
    /**
     * Check whether there is a control with the given name in the group.
     */
    contains(controlName) {
        var c = StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    }
    /** @internal */
    _setParentForControls() {
        StringMapWrapper.forEach(this.controls, (control, name) => { control.setParent(this); });
    }
    /** @internal */
    _updateValue() { this._value = this._reduceValue(); }
    /** @internal */
    _anyControlsHaveStatus(status) {
        var res = false;
        StringMapWrapper.forEach(this.controls, (control, name) => {
            res = res || (this.contains(name) && control.status == status);
        });
        return res;
    }
    /** @internal */
    _reduceValue() {
        return this._reduceChildren({}, (acc, control, name) => {
            acc[name] = control.value;
            return acc;
        });
    }
    /** @internal */
    _reduceChildren(initValue, fn) {
        var res = initValue;
        StringMapWrapper.forEach(this.controls, (control, name) => {
            if (this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    }
    /** @internal */
    _included(controlName) {
        var isOptional = StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || StringMapWrapper.get(this._optionals, controlName);
    }
}
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
 * other controls, but is of fixed length.
 *
 * ## Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `ControlArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
export class ControlArray extends AbstractControl {
    constructor(controls, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    at(index) { return this.controls[index]; }
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    push(control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    insert(index, control) {
        ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     * Remove the control at the given `index` in the array.
     */
    removeAt(index) {
        ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
    }
    /**
     * Length of the control array.
     */
    get length() { return this.controls.length; }
    /** @internal */
    _updateValue() { this._value = this.controls.map((control) => control.value); }
    /** @internal */
    _anyControlsHaveStatus(status) {
        return this.controls.some(c => c.status == status);
    }
    /** @internal */
    _setParentForControls() {
        this.controls.forEach((control) => { control.setParent(this); });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL21vZGVsLnRzIl0sIm5hbWVzIjpbImlzQ29udHJvbCIsIl9maW5kIiwidG9PYnNlcnZhYmxlIiwiQWJzdHJhY3RDb250cm9sIiwiQWJzdHJhY3RDb250cm9sLmNvbnN0cnVjdG9yIiwiQWJzdHJhY3RDb250cm9sLnZhbHVlIiwiQWJzdHJhY3RDb250cm9sLnN0YXR1cyIsIkFic3RyYWN0Q29udHJvbC52YWxpZCIsIkFic3RyYWN0Q29udHJvbC5lcnJvcnMiLCJBYnN0cmFjdENvbnRyb2wucHJpc3RpbmUiLCJBYnN0cmFjdENvbnRyb2wuZGlydHkiLCJBYnN0cmFjdENvbnRyb2wudG91Y2hlZCIsIkFic3RyYWN0Q29udHJvbC51bnRvdWNoZWQiLCJBYnN0cmFjdENvbnRyb2wudmFsdWVDaGFuZ2VzIiwiQWJzdHJhY3RDb250cm9sLnN0YXR1c0NoYW5nZXMiLCJBYnN0cmFjdENvbnRyb2wucGVuZGluZyIsIkFic3RyYWN0Q29udHJvbC5tYXJrQXNUb3VjaGVkIiwiQWJzdHJhY3RDb250cm9sLm1hcmtBc0RpcnR5IiwiQWJzdHJhY3RDb250cm9sLm1hcmtBc1BlbmRpbmciLCJBYnN0cmFjdENvbnRyb2wuc2V0UGFyZW50IiwiQWJzdHJhY3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkiLCJBYnN0cmFjdENvbnRyb2wuX3J1blZhbGlkYXRvciIsIkFic3RyYWN0Q29udHJvbC5fcnVuQXN5bmNWYWxpZGF0b3IiLCJBYnN0cmFjdENvbnRyb2wuX2NhbmNlbEV4aXN0aW5nU3Vic2NyaXB0aW9uIiwiQWJzdHJhY3RDb250cm9sLnNldEVycm9ycyIsIkFic3RyYWN0Q29udHJvbC5maW5kIiwiQWJzdHJhY3RDb250cm9sLmdldEVycm9yIiwiQWJzdHJhY3RDb250cm9sLmhhc0Vycm9yIiwiQWJzdHJhY3RDb250cm9sLnJvb3QiLCJBYnN0cmFjdENvbnRyb2wuX3VwZGF0ZUNvbnRyb2xzRXJyb3JzIiwiQWJzdHJhY3RDb250cm9sLl9pbml0T2JzZXJ2YWJsZXMiLCJBYnN0cmFjdENvbnRyb2wuX2NhbGN1bGF0ZVN0YXR1cyIsIkNvbnRyb2wiLCJDb250cm9sLmNvbnN0cnVjdG9yIiwiQ29udHJvbC51cGRhdGVWYWx1ZSIsIkNvbnRyb2wuX3VwZGF0ZVZhbHVlIiwiQ29udHJvbC5fYW55Q29udHJvbHNIYXZlU3RhdHVzIiwiQ29udHJvbC5yZWdpc3Rlck9uQ2hhbmdlIiwiQ29udHJvbEdyb3VwIiwiQ29udHJvbEdyb3VwLmNvbnN0cnVjdG9yIiwiQ29udHJvbEdyb3VwLmFkZENvbnRyb2wiLCJDb250cm9sR3JvdXAucmVtb3ZlQ29udHJvbCIsIkNvbnRyb2xHcm91cC5pbmNsdWRlIiwiQ29udHJvbEdyb3VwLmV4Y2x1ZGUiLCJDb250cm9sR3JvdXAuY29udGFpbnMiLCJDb250cm9sR3JvdXAuX3NldFBhcmVudEZvckNvbnRyb2xzIiwiQ29udHJvbEdyb3VwLl91cGRhdGVWYWx1ZSIsIkNvbnRyb2xHcm91cC5fYW55Q29udHJvbHNIYXZlU3RhdHVzIiwiQ29udHJvbEdyb3VwLl9yZWR1Y2VWYWx1ZSIsIkNvbnRyb2xHcm91cC5fcmVkdWNlQ2hpbGRyZW4iLCJDb250cm9sR3JvdXAuX2luY2x1ZGVkIiwiQ29udHJvbEFycmF5IiwiQ29udHJvbEFycmF5LmNvbnN0cnVjdG9yIiwiQ29udHJvbEFycmF5LmF0IiwiQ29udHJvbEFycmF5LnB1c2giLCJDb250cm9sQXJyYXkuaW5zZXJ0IiwiQ29udHJvbEFycmF5LnJlbW92ZUF0IiwiQ29udHJvbEFycmF5Lmxlbmd0aCIsIkNvbnRyb2xBcnJheS5fdXBkYXRlVmFsdWUiLCJDb250cm9sQXJyYXkuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyIsIkNvbnRyb2xBcnJheS5fc2V0UGFyZW50Rm9yQ29udHJvbHMiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUMsTUFBTSwwQkFBMEI7T0FDbkUsRUFBYSxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkI7T0FDOUUsRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkI7T0FDbkQsRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0M7QUFHNUU7O0dBRUc7QUFDSCxhQUFhLEtBQUssR0FBRyxPQUFPLENBQUM7QUFFN0I7O0dBRUc7QUFDSCxhQUFhLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFFakM7OztHQUdHO0FBQ0gsYUFBYSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBRWpDLDBCQUEwQixPQUFlO0lBQ3ZDQSxNQUFNQSxDQUFDQSxPQUFPQSxZQUFZQSxlQUFlQSxDQUFDQTtBQUM1Q0EsQ0FBQ0E7QUFFRCxlQUFlLE9BQXdCLEVBQUUsSUFBb0M7SUFDM0VDLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBRS9CQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxZQUFZQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUM3QkEsSUFBSUEsR0FBWUEsSUFBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBQ0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLFlBQVlBLEtBQUtBLElBQUlBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBRXBFQSxNQUFNQSxDQUEwQkEsSUFBS0E7U0FDaENBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBO1FBQ2RBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMvREEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLElBQUlBLEtBQUtBLEdBQVdBLElBQUlBLENBQUNBO1lBQ3pCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNyREEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDZEEsQ0FBQ0E7SUFDSEEsQ0FBQ0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDbEJBLENBQUNBO0FBRUQsc0JBQXNCLENBQU07SUFDMUJDLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7QUFDNUVBLENBQUNBO0FBRUQ7O0dBRUc7QUFDSDtJQWFFQyxZQUFtQkEsU0FBc0JBLEVBQVNBLGNBQWdDQTtRQUEvREMsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBYUE7UUFBU0EsbUJBQWNBLEdBQWRBLGNBQWNBLENBQWtCQTtRQUwxRUEsY0FBU0EsR0FBWUEsSUFBSUEsQ0FBQ0E7UUFDMUJBLGFBQVFBLEdBQVlBLEtBQUtBLENBQUNBO0lBSW1EQSxDQUFDQTtJQUV0RkQsSUFBSUEsS0FBS0EsS0FBVUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFeENGLElBQUlBLE1BQU1BLEtBQWFHLE1BQU1BLENBQUNB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QU1BLEtBQWFNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBRXJETixnQkFBZ0JBO0lBQ2hCQSxZQUFZQSxLQUFXTyxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxLQUFLQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVyRlAsZ0JBQWdCQTtJQUNoQkEsc0JBQXNCQSxDQUFDQSxNQUFjQTtRQUNuQ1EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDckRBLENBQUNBO0lBR0RSLGdCQUFnQkE7SUFDaEJBLHFCQUFxQkE7UUFDbkJTLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLE9BQU9BLE9BQU9BLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25FQSxDQUFDQTtBQUNIVCxDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIG5vcm1hbGl6ZUJvb2x9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGUsIEV2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1ZhbGlkYXRvckZuLCBBc3luY1ZhbGlkYXRvckZufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgYSBDb250cm9sIGlzIHZhbGlkLCBpLmUuIHRoYXQgbm8gZXJyb3JzIGV4aXN0IGluIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZBTElEID0gXCJWQUxJRFwiO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IGEgQ29udHJvbCBpcyBpbnZhbGlkLCBpLmUuIHRoYXQgYW4gZXJyb3IgZXhpc3RzIGluIHRoZSBpbnB1dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IElOVkFMSUQgPSBcIklOVkFMSURcIjtcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBhIENvbnRyb2wgaXMgcGVuZGluZywgaS5lLiB0aGF0IGFzeW5jIHZhbGlkYXRpb24gaXMgb2NjdXJyaW5nIGFuZFxuICogZXJyb3JzIGFyZSBub3QgeWV0IGF2YWlsYWJsZSBmb3IgdGhlIGlucHV0IHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgUEVORElORyA9IFwiUEVORElOR1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250cm9sKGNvbnRyb2w6IE9iamVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbDtcbn1cblxuZnVuY3Rpb24gX2ZpbmQoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBwYXRoOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+fCBzdHJpbmcpIHtcbiAgaWYgKGlzQmxhbmsocGF0aCkpIHJldHVybiBudWxsO1xuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICBwYXRoID0gKDxzdHJpbmc+cGF0aCkuc3BsaXQoXCIvXCIpO1xuICB9XG4gIGlmIChwYXRoIGluc3RhbmNlb2YgQXJyYXkgJiYgTGlzdFdyYXBwZXIuaXNFbXB0eShwYXRoKSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuICg8QXJyYXk8c3RyaW5nIHwgbnVtYmVyPj5wYXRoKVxuICAgICAgLnJlZHVjZSgodiwgbmFtZSkgPT4ge1xuICAgICAgICBpZiAodiBpbnN0YW5jZW9mIENvbnRyb2xHcm91cCkge1xuICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQodi5jb250cm9sc1tuYW1lXSkgPyB2LmNvbnRyb2xzW25hbWVdIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgQ29udHJvbEFycmF5KSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gPG51bWJlcj5uYW1lO1xuICAgICAgICAgIHJldHVybiBpc1ByZXNlbnQodi5hdChpbmRleCkpID8gdi5hdChpbmRleCkgOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LCBjb250cm9sKTtcbn1cblxuZnVuY3Rpb24gdG9PYnNlcnZhYmxlKHI6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gIHJldHVybiBQcm9taXNlV3JhcHBlci5pc1Byb21pc2UocikgPyBPYnNlcnZhYmxlV3JhcHBlci5mcm9tUHJvbWlzZShyKSA6IHI7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0Q29udHJvbCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZhbHVlOiBhbnk7XG5cbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfc3RhdHVzQ2hhbmdlczogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgX3N0YXR1czogc3RyaW5nO1xuICBwcml2YXRlIF9lcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIF9wcmlzdGluZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3RvdWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFyZW50OiBDb250cm9sR3JvdXAgfCBDb250cm9sQXJyYXk7XG4gIHByaXZhdGUgX2FzeW5jVmFsaWRhdGlvblN1YnNjcmlwdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWxpZGF0b3I6IFZhbGlkYXRvckZuLCBwdWJsaWMgYXN5bmNWYWxpZGF0b3I6IEFzeW5jVmFsaWRhdG9yRm4pIHt9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIGdldCBzdGF0dXMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3N0YXR1czsgfVxuXG4gIGdldCB2YWxpZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gVkFMSUQ7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXJyb3JzIG9mIHRoaXMgY29udHJvbC5cbiAgICovXG4gIGdldCBlcnJvcnMoKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5fZXJyb3JzOyB9XG5cbiAgZ2V0IHByaXN0aW5lKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcHJpc3RpbmU7IH1cblxuICBnZXQgZGlydHkoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5wcmlzdGluZTsgfVxuXG4gIGdldCB0b3VjaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB1bnRvdWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3ZhbHVlQ2hhbmdlczsgfVxuXG4gIGdldCBzdGF0dXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLl9zdGF0dXNDaGFuZ2VzOyB9XG5cbiAgZ2V0IHBlbmRpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGF0dXMgPT0gUEVORElORzsgfVxuXG4gIG1hcmtBc1RvdWNoZWQoKTogdm9pZCB7IHRoaXMuX3RvdWNoZWQgPSB0cnVlOyB9XG5cbiAgbWFya0FzRGlydHkoe29ubHlTZWxmfToge29ubHlTZWxmPzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIG9ubHlTZWxmID0gbm9ybWFsaXplQm9vbChvbmx5U2VsZik7XG4gICAgdGhpcy5fcHJpc3RpbmUgPSBmYWxzZTtcblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IG9ubHlTZWxmfSk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzUGVuZGluZyh7b25seVNlbGZ9OiB7b25seVNlbGY/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5fcGFyZW50Lm1hcmtBc1BlbmRpbmcoe29ubHlTZWxmOiBvbmx5U2VsZn0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFBhcmVudChwYXJlbnQ6IENvbnRyb2xHcm91cCB8IENvbnRyb2xBcnJheSk6IHZvaWQgeyB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7IH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KFxuICAgICAge29ubHlTZWxmLCBlbWl0RXZlbnR9OiB7b25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICBlbWl0RXZlbnQgPSBpc1ByZXNlbnQoZW1pdEV2ZW50KSA/IGVtaXRFdmVudCA6IHRydWU7XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuXG4gICAgdGhpcy5fZXJyb3JzID0gdGhpcy5fcnVuVmFsaWRhdG9yKCk7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAodGhpcy5fc3RhdHVzID09IFZBTElEIHx8IHRoaXMuX3N0YXR1cyA9PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3ZhbHVlQ2hhbmdlcywgdGhpcy5fdmFsdWUpO1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3RhdHVzQ2hhbmdlcywgdGhpcy5fc3RhdHVzKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkgJiYgIW9ubHlTZWxmKSB7XG4gICAgICB0aGlzLl9wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3J1blZhbGlkYXRvcigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnZhbGlkYXRvcikgPyB0aGlzLnZhbGlkYXRvcih0aGlzKSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXN5bmNWYWxpZGF0b3IpKSB7XG4gICAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuICAgICAgdGhpcy5fY2FuY2VsRXhpc3RpbmdTdWJzY3JpcHRpb24oKTtcbiAgICAgIHZhciBvYnMgPSB0b09ic2VydmFibGUodGhpcy5hc3luY1ZhbGlkYXRvcih0aGlzKSk7XG4gICAgICB0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24gPSBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoXG4gICAgICAgICAgb2JzLCAocmVzOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5zZXRFcnJvcnMocmVzLCB7ZW1pdEV2ZW50OiBlbWl0RXZlbnR9KSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuY2VsRXhpc3RpbmdTdWJzY3JpcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24pKSB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5kaXNwb3NlKHRoaXMuX2FzeW5jVmFsaWRhdGlvblN1YnNjcmlwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgZXJyb3JzIG9uIGEgY29udHJvbC5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VkIHdoZW4gdmFsaWRhdGlvbnMgYXJlIHJ1biBub3QgYXV0b21hdGljYWxseSwgYnV0IG1hbnVhbGx5IGJ5IHRoZSB1c2VyLlxuICAgKlxuICAgKiBDYWxsaW5nIGBzZXRFcnJvcnNgIHdpbGwgYWxzbyB1cGRhdGUgdGhlIHZhbGlkaXR5IG9mIHRoZSBwYXJlbnQgY29udHJvbC5cbiAgICpcbiAgICogIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBsb2dpbiA9IG5ldyBDb250cm9sKFwic29tZUxvZ2luXCIpO1xuICAgKiBsb2dpbi5zZXRFcnJvcnMoe1xuICAgKiAgIFwibm90VW5pcXVlXCI6IHRydWVcbiAgICogfSk7XG4gICAqXG4gICAqIGV4cGVjdChsb2dpbi52YWxpZCkudG9FcXVhbChmYWxzZSk7XG4gICAqIGV4cGVjdChsb2dpbi5lcnJvcnMpLnRvRXF1YWwoe1wibm90VW5pcXVlXCI6IHRydWV9KTtcbiAgICpcbiAgICogbG9naW4udXBkYXRlVmFsdWUoXCJzb21lT3RoZXJMb2dpblwiKTtcbiAgICpcbiAgICogZXhwZWN0KGxvZ2luLnZhbGlkKS50b0VxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICovXG4gIHNldEVycm9ycyhlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCB7ZW1pdEV2ZW50fToge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pOiB2b2lkIHtcbiAgICBlbWl0RXZlbnQgPSBpc1ByZXNlbnQoZW1pdEV2ZW50KSA/IGVtaXRFdmVudCA6IHRydWU7XG5cbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnM7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zdGF0dXNDaGFuZ2VzLCB0aGlzLl9zdGF0dXMpO1xuICAgIH1cblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSkge1xuICAgICAgdGhpcy5fcGFyZW50Ll91cGRhdGVDb250cm9sc0Vycm9ycygpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmQocGF0aDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPnwgc3RyaW5nKTogQWJzdHJhY3RDb250cm9sIHsgcmV0dXJuIF9maW5kKHRoaXMsIHBhdGgpOyB9XG5cbiAgZ2V0RXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIHBhdGg6IHN0cmluZ1tdID0gbnVsbCk6IGFueSB7XG4gICAgdmFyIGNvbnRyb2wgPSBpc1ByZXNlbnQocGF0aCkgJiYgIUxpc3RXcmFwcGVyLmlzRW1wdHkocGF0aCkgPyB0aGlzLmZpbmQocGF0aCkgOiB0aGlzO1xuICAgIGlmIChpc1ByZXNlbnQoY29udHJvbCkgJiYgaXNQcmVzZW50KGNvbnRyb2wuX2Vycm9ycykpIHtcbiAgICAgIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLmdldChjb250cm9sLl9lcnJvcnMsIGVycm9yQ29kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGhhc0Vycm9yKGVycm9yQ29kZTogc3RyaW5nLCBwYXRoOiBzdHJpbmdbXSA9IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuZ2V0RXJyb3IoZXJyb3JDb2RlLCBwYXRoKSk7XG4gIH1cblxuICBnZXQgcm9vdCgpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGxldCB4OiBBYnN0cmFjdENvbnRyb2wgPSB0aGlzO1xuXG4gICAgd2hpbGUgKGlzUHJlc2VudCh4Ll9wYXJlbnQpKSB7XG4gICAgICB4ID0geC5fcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiB4O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlQ29udHJvbHNFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5fdXBkYXRlQ29udHJvbHNFcnJvcnMoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9pbml0T2JzZXJ2YWJsZXMoKSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMuX3N0YXR1c0NoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZVN0YXR1cygpOiBzdHJpbmcge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fZXJyb3JzKSkgcmV0dXJuIElOVkFMSUQ7XG4gICAgaWYgKHRoaXMuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhQRU5ESU5HKSkgcmV0dXJuIFBFTkRJTkc7XG4gICAgaWYgKHRoaXMuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhJTlZBTElEKSkgcmV0dXJuIElOVkFMSUQ7XG4gICAgcmV0dXJuIFZBTElEO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBhYnN0cmFjdCBfdXBkYXRlVmFsdWUoKTogdm9pZDtcblxuICAvKiogQGludGVybmFsICovXG4gIGFic3RyYWN0IF9hbnlDb250cm9sc0hhdmVTdGF0dXMoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIERlZmluZXMgYSBwYXJ0IG9mIGEgZm9ybSB0aGF0IGNhbm5vdCBiZSBkaXZpZGVkIGludG8gb3RoZXIgY29udHJvbHMuIGBDb250cm9sYHMgaGF2ZSB2YWx1ZXMgYW5kXG4gKiB2YWxpZGF0aW9uIHN0YXRlLCB3aGljaCBpcyBkZXRlcm1pbmVkIGJ5IGFuIG9wdGlvbmFsIHZhbGlkYXRpb24gZnVuY3Rpb24uXG4gKlxuICogYENvbnRyb2xgIGlzIG9uZSBvZiB0aGUgdGhyZWUgZnVuZGFtZW50YWwgYnVpbGRpbmcgYmxvY2tzIHVzZWQgdG8gZGVmaW5lIGZvcm1zIGluIEFuZ3VsYXIsIGFsb25nXG4gKiB3aXRoIHtAbGluayBDb250cm9sR3JvdXB9IGFuZCB7QGxpbmsgQ29udHJvbEFycmF5fS5cbiAqXG4gKiAjIyBVc2FnZVxuICpcbiAqIEJ5IGRlZmF1bHQsIGEgYENvbnRyb2xgIGlzIGNyZWF0ZWQgZm9yIGV2ZXJ5IGA8aW5wdXQ+YCBvciBvdGhlciBmb3JtIGNvbXBvbmVudC5cbiAqIFdpdGgge0BsaW5rIE5nRm9ybUNvbnRyb2x9IG9yIHtAbGluayBOZ0Zvcm1Nb2RlbH0gYW4gZXhpc3Rpbmcge0BsaW5rIENvbnRyb2x9IGNhbiBiZVxuICogYm91bmQgdG8gYSBET00gZWxlbWVudCBpbnN0ZWFkLiBUaGlzIGBDb250cm9sYCBjYW4gYmUgY29uZmlndXJlZCB3aXRoIGEgY3VzdG9tXG4gKiB2YWxpZGF0aW9uIGZ1bmN0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC8yM0RFU09wYk5uQnBCSFp0MUJSND9wPXByZXZpZXcpKVxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbCBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55ID0gbnVsbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IG51bGwsXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogSWYgYG9ubHlTZWxmYCBpcyBgdHJ1ZWAsIHRoaXMgY2hhbmdlIHdpbGwgb25seSBhZmZlY3QgdGhlIHZhbGlkYXRpb24gb2YgdGhpcyBgQ29udHJvbGBcbiAgICogYW5kIG5vdCBpdHMgcGFyZW50IGNvbXBvbmVudC4gSWYgYGVtaXRFdmVudGAgaXMgYHRydWVgLCB0aGlzIGNoYW5nZSB3aWxsIGNhdXNlIGFcbiAgICogYHZhbHVlQ2hhbmdlc2AgZXZlbnQgb24gdGhlIGBDb250cm9sYCB0byBiZSBlbWl0dGVkLiBCb3RoIG9mIHRoZXNlIG9wdGlvbnMgZGVmYXVsdCB0b1xuICAgKiBgZmFsc2VgLlxuICAgKlxuICAgKiBJZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBgdHJ1ZWAsIHRoZSB2aWV3IHdpbGwgYmUgbm90aWZpZWQgYWJvdXQgdGhlIG5ldyB2YWx1ZVxuICAgKiB2aWEgYW4gYG9uQ2hhbmdlYCBldmVudC4gVGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBub3RcbiAgICogc3BlY2lmaWVkLlxuICAgKi9cbiAgdXBkYXRlVmFsdWUodmFsdWU6IGFueSwge29ubHlTZWxmLCBlbWl0RXZlbnQsIGVtaXRNb2RlbFRvVmlld0NoYW5nZX06IHtcbiAgICBvbmx5U2VsZj86IGJvb2xlYW4sXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhbixcbiAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZSA9IGlzUHJlc2VudChlbWl0TW9kZWxUb1ZpZXdDaGFuZ2UpID8gZW1pdE1vZGVsVG9WaWV3Q2hhbmdlIDogdHJ1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb25DaGFuZ2UpICYmIGVtaXRNb2RlbFRvVmlld0NoYW5nZSkgdGhpcy5fb25DaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVZhbHVlKCkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIGZvciBjaGFuZ2UgZXZlbnRzLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxufVxuXG4vKipcbiAqIERlZmluZXMgYSBwYXJ0IG9mIGEgZm9ybSwgb2YgZml4ZWQgbGVuZ3RoLCB0aGF0IGNhbiBjb250YWluIG90aGVyIGNvbnRyb2xzLlxuICpcbiAqIEEgYENvbnRyb2xHcm91cGAgYWdncmVnYXRlcyB0aGUgdmFsdWVzIGFuZCBlcnJvcnMgb2YgZWFjaCB7QGxpbmsgQ29udHJvbH0gaW4gdGhlIGdyb3VwLiBUaHVzLCBpZlxuICogb25lIG9mIHRoZSBjb250cm9scyBpbiBhIGdyb3VwIGlzIGludmFsaWQsIHRoZSBlbnRpcmUgZ3JvdXAgaXMgaW52YWxpZC4gU2ltaWxhcmx5LCBpZiBhIGNvbnRyb2xcbiAqIGNoYW5nZXMgaXRzIHZhbHVlLCB0aGUgZW50aXJlIGdyb3VwIGNoYW5nZXMgYXMgd2VsbC5cbiAqXG4gKiBgQ29udHJvbEdyb3VwYCBpcyBvbmUgb2YgdGhlIHRocmVlIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyB1c2VkIHRvIGRlZmluZSBmb3JtcyBpbiBBbmd1bGFyLFxuICogYWxvbmcgd2l0aCB7QGxpbmsgQ29udHJvbH0gYW5kIHtAbGluayBDb250cm9sQXJyYXl9LiB7QGxpbmsgQ29udHJvbEFycmF5fSBjYW4gYWxzbyBjb250YWluIG90aGVyXG4gKiBjb250cm9scywgYnV0IGlzIG9mIHZhcmlhYmxlIGxlbmd0aC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xHcm91cCBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIHByaXZhdGUgX29wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sczoge1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbH0sXG4gICAgICAgICAgICAgIG9wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gbnVsbCwgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IG51bGwsXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvckZuID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX29wdGlvbmFscyA9IGlzUHJlc2VudChvcHRpb25hbHMpID8gb3B0aW9uYWxzIDoge307XG4gICAgdGhpcy5faW5pdE9ic2VydmFibGVzKCk7XG4gICAgdGhpcy5fc2V0UGFyZW50Rm9yQ29udHJvbHMoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe29ubHlTZWxmOiB0cnVlLCBlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgY29udHJvbCB0byB0aGlzIGdyb3VwLlxuICAgKi9cbiAgYWRkQ29udHJvbChuYW1lOiBzdHJpbmcsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbHNbbmFtZV0gPSBjb250cm9sO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNvbnRyb2wgZnJvbSB0aGlzIGdyb3VwLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChuYW1lOiBzdHJpbmcpOiB2b2lkIHsgU3RyaW5nTWFwV3JhcHBlci5kZWxldGUodGhpcy5jb250cm9scywgbmFtZSk7IH1cblxuICAvKipcbiAgICogTWFyayB0aGUgbmFtZWQgY29udHJvbCBhcyBub24tb3B0aW9uYWwuXG4gICAqL1xuICBpbmNsdWRlKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldCh0aGlzLl9vcHRpb25hbHMsIGNvbnRyb2xOYW1lLCB0cnVlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIHRoZSBuYW1lZCBjb250cm9sIGFzIG9wdGlvbmFsLlxuICAgKi9cbiAgZXhjbHVkZShjb250cm9sTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSwgZmFsc2UpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYSBjb250cm9sIHdpdGggdGhlIGdpdmVuIG5hbWUgaW4gdGhlIGdyb3VwLlxuICAgKi9cbiAgY29udGFpbnMoY29udHJvbE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciBjID0gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLmNvbnRyb2xzLCBjb250cm9sTmFtZSk7XG4gICAgcmV0dXJuIGMgJiYgdGhpcy5faW5jbHVkZWQoY29udHJvbE5hbWUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0UGFyZW50Rm9yQ29udHJvbHMoKSB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKFxuICAgICAgICB0aGlzLmNvbnRyb2xzLCAoY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBuYW1lOiBzdHJpbmcpID0+IHsgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7IH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlVmFsdWUoKSB7IHRoaXMuX3ZhbHVlID0gdGhpcy5fcmVkdWNlVmFsdWUoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciByZXMgPSBmYWxzZTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXMgPSByZXMgfHwgKHRoaXMuY29udGFpbnMobmFtZSkgJiYgY29udHJvbC5zdGF0dXMgPT0gc3RhdHVzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZHVjZUNoaWxkcmVuKFxuICAgICAgICB7fSwgKGFjYzoge1trOiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9LCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGFjY1tuYW1lXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWR1Y2VDaGlsZHJlbihpbml0VmFsdWU6IGFueSwgZm46IEZ1bmN0aW9uKSB7XG4gICAgdmFyIHJlcyA9IGluaXRWYWx1ZTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5jbHVkZWQobmFtZSkpIHtcbiAgICAgICAgcmVzID0gZm4ocmVzLCBjb250cm9sLCBuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5jbHVkZWQoY29udHJvbE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHZhciBpc09wdGlvbmFsID0gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLl9vcHRpb25hbHMsIGNvbnRyb2xOYW1lKTtcbiAgICByZXR1cm4gIWlzT3B0aW9uYWwgfHwgU3RyaW5nTWFwV3JhcHBlci5nZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgcGFydCBvZiBhIGZvcm0sIG9mIHZhcmlhYmxlIGxlbmd0aCwgdGhhdCBjYW4gY29udGFpbiBvdGhlciBjb250cm9scy5cbiAqXG4gKiBBIGBDb250cm9sQXJyYXlgIGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlcyBhbmQgZXJyb3JzIG9mIGVhY2gge0BsaW5rIENvbnRyb2x9IGluIHRoZSBncm91cC4gVGh1cywgaWZcbiAqIG9uZSBvZiB0aGUgY29udHJvbHMgaW4gYSBncm91cCBpcyBpbnZhbGlkLCB0aGUgZW50aXJlIGdyb3VwIGlzIGludmFsaWQuIFNpbWlsYXJseSwgaWYgYSBjb250cm9sXG4gKiBjaGFuZ2VzIGl0cyB2YWx1ZSwgdGhlIGVudGlyZSBncm91cCBjaGFuZ2VzIGFzIHdlbGwuXG4gKlxuICogYENvbnRyb2xBcnJheWAgaXMgb25lIG9mIHRoZSB0aHJlZSBmdW5kYW1lbnRhbCBidWlsZGluZyBibG9ja3MgdXNlZCB0byBkZWZpbmUgZm9ybXMgaW4gQW5ndWxhcixcbiAqIGFsb25nIHdpdGgge0BsaW5rIENvbnRyb2x9IGFuZCB7QGxpbmsgQ29udHJvbEdyb3VwfS4ge0BsaW5rIENvbnRyb2xHcm91cH0gY2FuIGFsc28gY29udGFpblxuICogb3RoZXIgY29udHJvbHMsIGJ1dCBpcyBvZiBmaXhlZCBsZW5ndGguXG4gKlxuICogIyMgQWRkaW5nIG9yIHJlbW92aW5nIGNvbnRyb2xzXG4gKlxuICogVG8gY2hhbmdlIHRoZSBjb250cm9scyBpbiB0aGUgYXJyYXksIHVzZSB0aGUgYHB1c2hgLCBgaW5zZXJ0YCwgb3IgYHJlbW92ZUF0YCBtZXRob2RzXG4gKiBpbiBgQ29udHJvbEFycmF5YCBpdHNlbGYuIFRoZXNlIG1ldGhvZHMgZW5zdXJlIHRoZSBjb250cm9scyBhcmUgcHJvcGVybHkgdHJhY2tlZCBpbiB0aGVcbiAqIGZvcm0ncyBoaWVyYXJjaHkuIERvIG5vdCBtb2RpZnkgdGhlIGFycmF5IG9mIGBBYnN0cmFjdENvbnRyb2xgcyB1c2VkIHRvIGluc3RhbnRpYXRlXG4gKiB0aGUgYENvbnRyb2xBcnJheWAgZGlyZWN0bHksIGFzIHRoYXQgd2lsbCByZXN1bHQgaW4gc3RyYW5nZSBhbmQgdW5leHBlY3RlZCBiZWhhdmlvciBzdWNoXG4gKiBhcyBicm9rZW4gY2hhbmdlIGRldGVjdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xBcnJheSBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sczogQWJzdHJhY3RDb250cm9sW10sIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSBudWxsLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcjogQXN5bmNWYWxpZGF0b3JGbiA9IG51bGwpIHtcbiAgICBzdXBlcih2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9pbml0T2JzZXJ2YWJsZXMoKTtcbiAgICB0aGlzLl9zZXRQYXJlbnRGb3JDb250cm9scygpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IHRydWUsIGVtaXRFdmVudDogZmFsc2V9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBnaXZlbiBgaW5kZXhgIGluIHRoZSBhcnJheS5cbiAgICovXG4gIGF0KGluZGV4OiBudW1iZXIpOiBBYnN0cmFjdENvbnRyb2wgeyByZXR1cm4gdGhpcy5jb250cm9sc1tpbmRleF07IH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgbmV3IHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5LlxuICAgKi9cbiAgcHVzaChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgbmV3IHtAbGluayBBYnN0cmFjdENvbnRyb2x9IGF0IHRoZSBnaXZlbiBgaW5kZXhgIGluIHRoZSBhcnJheS5cbiAgICovXG4gIGluc2VydChpbmRleDogbnVtYmVyLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5pbnNlcnQodGhpcy5jb250cm9scywgaW5kZXgsIGNvbnRyb2wpO1xuICAgIGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgY29udHJvbCBhdCB0aGUgZ2l2ZW4gYGluZGV4YCBpbiB0aGUgYXJyYXkuXG4gICAqL1xuICByZW1vdmVBdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgTGlzdFdyYXBwZXIucmVtb3ZlQXQodGhpcy5jb250cm9scywgaW5kZXgpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgY29udHJvbCBhcnJheS5cbiAgICovXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29udHJvbHMubGVuZ3RoOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlVmFsdWUoKTogdm9pZCB7IHRoaXMuX3ZhbHVlID0gdGhpcy5jb250cm9scy5tYXAoKGNvbnRyb2wpID0+IGNvbnRyb2wudmFsdWUpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udHJvbHMuc29tZShjID0+IGMuc3RhdHVzID09IHN0YXR1cyk7XG4gIH1cblxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldFBhcmVudEZvckNvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4geyBjb250cm9sLnNldFBhcmVudCh0aGlzKTsgfSk7XG4gIH1cbn1cbiJdfQ==