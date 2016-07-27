<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $table = 'todos';

    protected $fillable = ['title', 'project_id', 'done', 'schedule_date', 'priority', 'label', 'minutes', 'invoiced'];

    public function invoice()
    {
        return $this->belongsTo('App\Invoice');
    }
}
