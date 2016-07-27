<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;


class AppRepositoryProvider extends ServiceProvider  {

    /**
     * Register all repositories.
     *
     * @author	Andrea Marco Sartori
     * @return	void
     */
    public function register()
    {
        $this->registerPostRepository();
    }


    public function registerPostRepository()
    {
        $repository = 'App\Awesome\Todo\TodoRepository';
        $this->app->bind('App\Awesome\Todo\TodoInterface', $repository);

        $repository = 'App\Awesome\Project\ProjectRepository';
        $this->app->bind('App\Awesome\Project\ProjectInterface', $repository);

        $repository = 'App\Awesome\Invoice\InvoiceRepository';
        $this->app->bind('App\Awesome\Invoice\InvoiceInterface', $repository);
    }
} 