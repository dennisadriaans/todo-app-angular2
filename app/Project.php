<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    protected $fillable = ['title'];

    public function todos()
    {
        return $this->hasMany('App\Todo');
    }

    public function client()
    {
        return $this->belongsTo('App\Client');
    }
}
