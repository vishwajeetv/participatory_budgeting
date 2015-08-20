<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Suggestion extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'suggestions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','city_id','suggestion','instance_id','zone_division_id','city_function_id','area','status'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

}
