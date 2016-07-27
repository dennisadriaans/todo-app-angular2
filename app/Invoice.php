<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = ['title', 'client_id'];

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function todos()
    {
        return $this->hasMany('App\Todo', 'invoiced');
    }
}
