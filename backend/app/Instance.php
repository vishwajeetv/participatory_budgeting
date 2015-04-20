<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Instance extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'instances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','name', 'city_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */


}
