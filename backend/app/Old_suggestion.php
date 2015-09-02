<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use App\City;

class Old_suggestion extends Model {



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'old_suggestions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','receipt_no','name','email',
        'work_type','location','work_description','work_purpose', 'status',
    'reason_for_rejection' , 'email_sent'];

    public $timestamps = false;
}
