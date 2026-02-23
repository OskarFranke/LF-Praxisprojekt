<?php
return [
    'ctrl' => [
        'title' => 'Screening',
        'label' => 'start_time',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'delete' => 'deleted',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'searchFields' => 'room',
        'iconfile' => 'EXT:core/Resources/Public/Icons/T3Icons/svgs/content/content-text.svg',
    ],
    'columns' => [
        'hidden' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.hidden',
            'config' => [
                'type' => 'check',
                'items' => [
                    ['1', '', '']
                ],
            ],
        ],
        'movie' => [
            'exclude' => false,
            'label' => 'Movie',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'foreign_table' => 'tx_cinemaapi_domain_model_movie',
                'minitems' => 1,
                'maxitems' => 1,
            ],
        ],
        'start_time' => [
            'exclude' => false,
            'label' => 'Start Time',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'eval' => 'datetime,int,required',
                'default' => time()
            ]
        ],
        'room' => [
            'exclude' => false,
            'label' => 'Room',
            'config' => [
                'type' => 'input',
                'size' => 10,
                'eval' => 'trim,required'
            ]
        ],
    ],
    'types' => [
        '1' => ['showitem' => 'hidden, movie, start_time, room'],
    ],
];