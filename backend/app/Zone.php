<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'zones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','name','division_id','division_name','areas'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

}
