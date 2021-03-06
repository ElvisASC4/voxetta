/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {LitElement, html} from 'lit-element';

import {CircularProgress} from '@material/mwc-circular-progress';
import {ReRecordButton} from './ReRecordButton';
import {PlaybackButton} from './PlaybackButton';

import {AudioRecorder} from '../utils/AudioRecorder';
import {UtteranceApiService} from '../utils/UtteranceApiService';
import {CollectionStates} from '../utils/CollectionStatesEnum';

import style from '../styles/components/RecordingSection.css';

export class RecordingSection extends LitElement {
    static get properties() {
        return {
            collectionState: {type: String},
            audioStream: {type: Object},
            context: {type: Object},
            qcError: {type: String},
            disableButtons: {type: Boolean},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();
        this.audioUrl = undefined;
        this.qcError = '';
    }

    updated() {
        if (
            this.collectionState === CollectionStates.TRANSITIONING ||
            this.collectionState === CollectionStates.UPLOAD_ERROR ||
            this.collectionState === CollectionStates.TOAST
        )
            this.disableButtons = true;
        else this.disableButtons = false;
    }

    handleReRecord() {
        this.dispatchCollectionState(CollectionStates.NOT_RECORDING);
    }

    handleAudioUrl(e) {
        this.audioUrl = e.detail.url;
    }

    dispatchCollectionState(newState) {
        const event = new CustomEvent('update-collection-state', {
            detail: {
                state: newState,
            },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(event);
    }

    toastDisplayed() {
        return this.collectionState === CollectionStates.TOAST;
    }

    /**
     * Render space above recording button depending on state
     */
    renderFeedbackWindow() {
        switch (this.collectionState) {
            case CollectionStates.RECORDING:
                return html` <vox-sound-wave
                    ?isRecording=${this.collectionState ===
                    CollectionStates.RECORDING}
                    .audioStream=${this.audioStream}
                    .context=${this.context}
                >
                </vox-sound-wave>`;
            case CollectionStates.BEFORE_UPLOAD:
                return html`<vox-playback-button
                    .audioUrl=${this.audioUrl}
                    @playback-start=${this.startPlayback}
                    @playback-stop=${this.stopPlayback}
                ></vox-playback-button>`;
            case CollectionStates.QC_ERROR:
                return html`<p>${this.qcError}</p>`;
            case CollectionStates.TRANSITIONING:
                return html`<mwc-circular-progress
                    indeterminate
                ></mwc-circular-progress>`;
            default:
                return html``;
        }
    }

    render() {
        return html` <div
                class="section-container ${this.toastDisplayed()
                    ? 'buttons-disabled'
                    : ''}"
            >
                <div id="feedback" class="feedback-container">
                    ${this.renderFeedbackWindow()}
                </div>
            </div>

            <div class="buttons">
                <div class="button-container">
                    ${this.collectionState === CollectionStates.BEFORE_UPLOAD
                        ? html`<vox-re-record-button
                              @re-record=${this.handleReRecord}
                              ?disabled=${this.disableButtons}
                          ></vox-re-record-button>`
                        : html``}
                </div>
                <div class="record-button-container">
                    <vox-record-button
                        .collectionState=${this.collectionState}
                        @set-audio-url=${this.handleAudioUrl}
                        ?disabled=${this.disableButtons}
                    >
                    </vox-record-button>
                </div>
                <div class="button-container">
                    <vox-skip-button
                        ?disabled=${this.disableButtons}
                    ></vox-skip-button>
                </div>
            </div>`;
    }
}

customElements.define('vox-recording-section', RecordingSection);
