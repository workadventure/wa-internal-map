/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from '@workadventure/scripting-api-extra'

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');

        // Place the countdown GIF inside of the cinema screen
        const countdown = await WA.room.website.get('cinemaScreen');
        countdown.x = 1670;
        countdown.y = 802;
        countdown.width = 320;
        countdown.height = 240;

        // Place the github repository card
        const githubRepository = await WA.room.website.get('githubRepository');
        githubRepository.x = 3272;
        githubRepository.y = 1088;
        githubRepository.width = 400;
        githubRepository.height = 300;
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

// Manage the animated CTAs
WA.room.onEnterZone('toRoom3', () => WA.room.hideLayer('doorTipSwitch'));
WA.room.onLeaveZone('toRoom3', () => WA.room.showLayer('doorTipSwitch'));

WA.room.onEnterZone('doorCode', () => WA.room.hideLayer('ctaDigitCodeSwitch'));
WA.room.onLeaveZone('doorCode', () => WA.room.showLayer('ctaDigitCodeSwitch'));

// Manage popups
let currentZone: string;
let currentPopup: any;

const config = [
 {
        zone: 'exitMeta',
        message: 'Get to know our new Metadventure project and our Gen1 NFT collection!',
        cta: [
            {
                label: 'Website',
                className: 'primary',
                callback: () => WA.nav.openTab('https://metadventu.re/'),
            },
            {
                label: 'Metaverse',
                className: 'primary',
                callback: () => WA.nav.goToPage('https://play.staging.workadventu.re/@/metaventure/land/portal#from-wa'),
            }
        ]
    },
    {
        zone: 'needHelp',
        message: 'Do you need some guidance? Meet us by going at the top left of the map!',
        cta: []
    },
    {
        zone: 'followUs1',
        message: 'Hey! Have you already started following us?',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/workadventu-re'),
            },
            {
                label: 'Twitter',
                className: 'primary',
                callback: () => WA.nav.openTab('https://twitter.com/workadventure_'),
            }
        ]
    },
    {
        zone: 'followUs2',
        message: 'Hey! Have you already started following us?',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/workadventu-re'),
            },
            {
                label: 'Twitter',
                className: 'primary',
                callback: () => WA.nav.openTab('https://twitter.com/workadventure_'),
            }
        ]
    },
    {
        zone: 'followUs3',
        message: 'Hey! Have you already started following us?',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/workadventu-re'),
            },
            {
                label: 'Twitter',
                className: 'primary',
                callback: () => WA.nav.openTab('https://twitter.com/workadventure_'),
            }
        ]
    },
    {
        zone: 'doorCode',
        message: 'Hello, I\'m Mr Robot. The code is 5300.',
        cta: []
    },
    {
        zone: 'toRoom3',
        message: 'Want to access the gaming room? Mr Robot can help you!',
        cta: []
    },
    {
        zone: 'meetDesk',
        message: 'Learn more about WorkAdventure events and our ProductHunt launch!',
        cta: [
            {
                label: 'Dismiss',
                className: 'normal',
                callback: () => WA.state.saveVariable('dontShowMeetPopup', true).then(() => closePopup()),
            }
        ]
    },
    {
        zone: 'workDesk',
        message: 'See how your virtual office could be. This is a small example of course ;)',
        cta: [
            {
                label: 'Dismiss',
                className: 'normal',
                callback: () => WA.state.saveVariable('dontShowWorkPopup', true).then(() => closePopup()),
            }
        ]
    },
    {
        zone: 'collaborateDesk',
        message: 'Test and feel live integrations of collaborative software!',
        cta: [
            {
                label: 'Dismiss',
                className: 'normal',
                callback: () => WA.state.saveVariable('dontShowCollaboratePopup', true).then(() => closePopup()),
            }
        ]
    },
    {
        zone: 'playDesk',
        message: 'Experience multi and solo games, directly embedded into WorkAdventure!',
        cta: [
            {
                label: 'Dismiss',
                className: 'normal',
                callback: () => WA.state.saveVariable('dontShowPlayPopup', true).then(() => closePopup()),
            }
        ]
    },
    {
        zone: 'createDesk',
        message: 'Do you want to create your own map by yourself? See how here!',
        cta: [
            {
                label: 'Dismiss',
                className: 'normal',
                callback: () => WA.state.saveVariable('dontShowCreatePopup', true).then(() => closePopup()),
            }
        ]
    },
    {
        zone: 'signup',
        message: 'Sign up for free and create your own map!',
        cta: [
            {
                label: 'Close',
                className: 'normal',
                callback: () => closePopup(),
            },
            {
                label: 'Sign up for free',
                className: 'primary',
                callback: () => WA.nav.openTab('https://workadventu.re/getting-started'),
            }
        ]
    }
]

WA.room.onEnterZone('exitMeta', () => openPopup('exitMeta'));
WA.room.onLeaveZone('exitMeta', closePopup);

// Need Help / Follow Us
WA.room.onEnterZone('needHelp', () => openPopup('needHelp'));
WA.room.onLeaveZone('needHelp', closePopup);

WA.room.onEnterZone('followUs1', () => openPopup('followUs1'));
WA.room.onLeaveZone('followUs1', closePopup);

WA.room.onEnterZone('followUs2', () => openPopup('followUs2'));
WA.room.onLeaveZone('followUs2', closePopup);

WA.room.onEnterZone('followUs3', () => openPopup('followUs3'));
WA.room.onLeaveZone('followUs3', closePopup);

WA.room.onEnterZone('signupZone', () => openPopup('signup'));
WA.room.onLeaveZone('signupZone', closePopup);

WA.state.onVariableChange('gardenDoor').subscribe((data: unknown) => {
    if(data === true){
        setTimeout(() => {
            WA.state.saveVariable('gardenDoor', false);
        }, 10000);
    }
});

// Room desks
WA.room.onEnterZone('meetDesk', () => {
    const dontShow = WA.state.loadVariable('dontShowMeetPopup')
    if (dontShow) return;

    openPopup('meetDesk')
});
WA.room.onLeaveZone('meetDesk', closePopup);

WA.room.onEnterZone('workDesk', () => {
    const dontShow = WA.state.loadVariable('dontShowWorkPopup')
    if (dontShow) return;

    openPopup('workDesk')
});
WA.room.onLeaveZone('workDesk', closePopup);

WA.room.onEnterZone('collaborateDesk', () => {
    const dontShow = WA.state.loadVariable('dontShowCollaboratePopup')
    if (dontShow) return;

    openPopup('collaborateDesk')
});
WA.room.onLeaveZone('collaborateDesk', closePopup);

WA.room.onEnterZone('playDesk', () => {
    const dontShow = WA.state.loadVariable('dontShowPlayPopup')
    if (dontShow) return;

    openPopup('playDesk')
});
WA.room.onLeaveZone('playDesk', closePopup);

WA.room.onEnterZone('createDesk', () => {
    const dontShow = WA.state.loadVariable('dontShowCreatePopup')
    if (dontShow) return;

    openPopup('createDesk')
});
WA.room.onLeaveZone('createDesk', closePopup);

// Manage the popups to open the Room3 door
WA.room.onEnterZone('doorCode', () => openPopup('doorCode'));
WA.room.onLeaveZone('doorCode', closePopup);

WA.room.onEnterZone('toRoom3', () => {
    const isDoorOpen = WA.state.loadVariable('room3Door')
    if (isDoorOpen) return;

    openPopup('toRoom3')
});
WA.room.onLeaveZone('toRoom3', closePopup);

// Popup management functions
function openPopup(zoneName: string) {
    currentZone = zoneName
    const popupName = zoneName + 'Popup'
    const zone = config.find((item) => {
        return item.zone == zoneName
    });

    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}