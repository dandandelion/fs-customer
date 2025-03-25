<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    
    protected $table = 'customer';

    public $timestamps = true;

    protected $fillable = [
        'email_address',
        'first_name',
        'last_name',
        'contact_no',
    ];
}
