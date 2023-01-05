/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

import "./onboarding";
import "./survey";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { openFunnel } from "./onboarding";

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');

        // Place the countdown GIF inside of the cinema screen
        try{
            const countdown = await WA.room.website.get('cinemaScreen');
            countdown.x = 1670;
            countdown.y = 802;
            countdown.width = 320;
            countdown.height = 240;
        }catch(err){
            console.error(err);
        }
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
        zone: 'signup1',
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
                callback: () => openFunnel(0)
            }
        ]
    },
    {
        zone: 'signup2',
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
                callback: () => openFunnel(0),
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

WA.room.onEnterZone('signupZone1', () => openPopup('signup1'));
WA.room.onLeaveZone('signupZone1', closePopup);

WA.room.onEnterZone('signupZone2', () => openPopup('signup2'));
WA.room.onLeaveZone('signupZone2', closePopup);

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

// Exit to Metadventure
WA.room.area.onEnter("exitToMetadventure").subscribe(() => {
    WA.room.showLayer("haloExitMetadventure")
    currentPopup = WA.ui.openPopup("exitToMetadventurePopup", "Teleport to Metadventure", [
        {
            label: 'Whoosh!',
            className: 'primary',
            callback: () => WA.nav.goToPage("https://play.metadventu.re/@/village#from-workadventure"),
        }
    ])
})
WA.room.area.onLeave("exitToMetadventure").subscribe(() => {
    closePopup()
    WA.room.hideLayer("haloExitMetadventure")
})

// Exit to Metadventure Gen1
WA.room.area.onEnter("exitToMetadventureGen1").subscribe(() => {
    currentPopup = WA.ui.openPopup("exitToMetadventureGen1Popup", "This painting from the 1650s represents the secret world of Metadventure Gen.1", [
        {
            label: 'Touch the painting...',
            className: 'primary',
            callback: () => WA.nav.goToPage("https://play.metadventu.re/@/gen-1-world"),
        }
    ])
})
WA.room.area.onLeave("exitToMetadventureGen1").subscribe(closePopup)

// Popup management functions
function openPopup(zoneName: string) {
    const popupName = zoneName + 'Popup'
    const zone = config.find((item) => {
        return item.zone == zoneName
    });

    if (typeof zone !== 'undefined') {
        // @ts-ignore
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}
