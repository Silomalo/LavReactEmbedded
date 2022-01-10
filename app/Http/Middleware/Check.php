<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Check
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        /* if(Auth::check()){

        }else{
            return response()->json([
                'status' => 201,
                'message' => 'Not Authenticated',
            ]);
        } */
        $role=User::find(Auth::id());
        if( $role->role != 1){
            return response()->json([
                'status' =>201,
                'message' => 'Not Authenticated for role 1',
            ]);
        }
        return $next($request);


    }
}
