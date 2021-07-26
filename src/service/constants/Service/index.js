/**
*
* Disclaimer: Source code mentioned below is(are) Intellectual Property of
* Crayon Data Holdings Limited (including its subsidiaries and affiliates).
* Crayon Data Holdings Limited reserves right to own and control it the way
* it may deem fit. You must refrain from use, access, read, modify, add or
* delete, sell or use in any other package or programme pertaining to such
* source code without explicit prior written approval of
* Crayon Data Holding Limited. Breach of the same shall attract penalty as
* applicable.
*
*/
export const SERVICE = {
    TYPE: {
        URBAN_CLAP: 'urbanClap',
        JUST_DAIL: 'justDail',
        SURVEY_TYPE: 'surveyType',
        RECOMENDED: 'recomendedService',
    },
    CALL_BACK_OPPTION: {
        APPOINTMENT: 'appointment',
        CALL_BACK: 'callBack',
        NO_CALL_BACK: 'noCallBack'
    },
    STATUS: {
        ACTIVE: 'active',
        IN_ACTIVE: 'inactive',
        DELETED: 'deleted'
    },
    PROPERTIES: {
        CHECK_BOX: 'checkBox',
        RADIO: 'radio',
        DROP_DOWN: 'dropDown',
        FREE_TEXT: 'freeText',
        DATE: 'date',
        NUMARIC: 'numaric',
        GPS: 'gps',
        FILE_UPLOAD: 'fileUpload',
        SLIDER: 'slider',
        RANGE_SLIDER: 'rangeSlider',
    },

    LAYOUT_OPTION : [
        { label: "Rectangle", value: 'rectangle' },
        { label: "Grid", value: 'grid' },
        { label: "List View", value: 'listView' },
        { label: "Box View", value: 'boxView' },
        { label: "Card Type", value: 'cardType' }
      ],
}