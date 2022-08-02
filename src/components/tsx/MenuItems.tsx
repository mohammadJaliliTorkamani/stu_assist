export const MenuItems = [
    {
        title: 'خدمات',
        submenu: [{
            title: 'پذیرش',
            submenu: [
                {
                    title: 'تجربه پذیرش',
                    path: '/application-experience',
                }, {
                    title: 'GPA محاسبه',
                    path: '/gpa-calculator',
                }, {
                    title: 'ECTS محاسبه',
                    path: '/ects-calculator',
                }
            ]
        }, {
            title: 'ویزا',
            submenu: [
                {
                    title: 'دارالترجمه های رسمی',
                    path: '/translation-offices',
                }, {
                    title: 'سفارت ها',
                    path: '/embassies',
                }
            ]
        }, {
            title: 'عمومی',
            submenu: [
                {
                    title: 'تالار گفتگو',
                    path: '/forums',
                }, {
                    title: 'منابع',
                    submenu: [{
                        title: 'امور تحصیلی',
                        submenu: [
                            {
                                title: "سامانه سجاد",
                                path: 'https://portal.saorg.ir/',
                            },
                            {
                                title: "سامانه تاییدیه تحصیلی",
                                path: "https://emt.medu.ir/",
                            }
                        ]
                    }, {
                        title: 'پست بین المللی',
                        submenu: [
                            {
                                title: " PDE پست",
                                path: 'https://www.pdexp.com/',
                            }, {
                                title: "کارا پست",
                                path: "https://karapost.com/",
                            }
                        ]
                    }, {
                        title: 'ویزامتریک آلمان',
                        path: 'https://www.visametric.com/iran/Germany/fa',
                    }]
                }
            ]
        }]
    },
];