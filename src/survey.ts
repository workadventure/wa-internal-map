/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

console.info('Survey feedback Script started successfully');

WA.onInit().then(() => {
    // Add new button to let a feedback
    if(WA.player.state.hasFeedback)return;
    addFeebackButton();

    // Load hasFeedback variable for user and remove button when it's finish
    WA.player.state.onVariableChange('hasFeedback').subscribe((value) => {
        if(value === true){
            WA.ui.actionBar.removeButton('feedback-btn');
        }
    });
});

const openSurveyFeedback = (TIME_TO_OPEN_FUNNEL = 2000) => {
    setTimeout(() => {
        WA.ui.modal.closeModal();
        WA.ui.modal.openModal({
            src: "https://blocksurvey.io/survey/14XmdFgaavcm44dHJ6Bx8hAFwJYKs7LmFG/f455240f-e7a4-4523-a2aa-87665bf29969",
            allow: "fullscreen",
            title: "Subscription",
            allowApi: true,
            position: "center",
        });
    }, TIME_TO_OPEN_FUNNEL);
}

const addFeebackButton = () => {
    if(WA.player.state.hasFeedback) return;
    WA.ui.actionBar.addButton({
        id: 'feedback-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/logo/workadventure-rate-white.svg',
        toolTip: 'Feedback',
        callback: (event) => {
            console.log('Button feedback triggered', event);
            openSurveyFeedback(0);
        }
    });
}

export {};
