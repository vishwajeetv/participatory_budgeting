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
    protected $fillable = ['id','city_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

}
