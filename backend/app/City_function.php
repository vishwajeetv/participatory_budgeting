<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class City_function extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'city_functions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','function','city_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

}
