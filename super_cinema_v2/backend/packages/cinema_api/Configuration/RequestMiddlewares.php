<?php
return [
    'frontend' => [
        'oskar/cinema-api/api-middleware' => [
            'target' => \Oskar\CinemaApi\Middleware\ApiMiddleware::class ,
            'before' => [
                'typo3/cms-frontend/page-resolver',
            ],
        ],
    ],
];