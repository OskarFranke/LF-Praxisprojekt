<?php
return [
    'ctrl' => [
        'title' => 'Snack',
        'label' => 'title',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'delete' => 'deleted',
        'enablecolumns' => [
            'disabled' => 'hidden',
        ],
        'searchFields' => 'title,description',
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
        'title' => [
            'exclude' => false,
            'label' => 'Title',
            'config' => [
                'type' => 'input',
                'size' => 30,
                'eval' => 'trim,required'
            ],
        ],
        'description' => [
            'exclude' => false,
            'label' => 'Description',
            'config' => [
                'type' => 'text',
                'cols' => 40,
                'rows' => 15,
                'eval' => 'trim',
            ],
        ],
        'category' => [
            'exclude' => false,
            'label' => 'Category',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['Food', 'food'],
                    ['Drinks', 'drink'],
                ],
            ]
        ],
        'price' => [
            'exclude' => false,
            'label' => 'Price',
            'config' => [
                'type' => 'input',
                'size' => 10,
                'eval' => 'double2,required',
                'default' => 0.00
            ]
        ],
    ],
    'types' => [
        '1' => ['showitem' => 'hidden, title, category, price, description'],
    ],
];