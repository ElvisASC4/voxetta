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
import style from './styles/ViewContainer.css.js';

import Views from './utils/ViewsEnum';

import {VoxettaPrompts} from './components/VoxettaPrompts';
import {VoxettaUserIcon} from './components/user/VoxettaUserIcon';
import {VoxettaUserForm} from './components/user/VoxettaUserForm';
import {VoxettaWaveCanvas} from './components/VoxettaWaveCanvas';
import {VoxettaRecordButton} from './components/VoxettaRecordButton';
import {VoxettaSkipButton} from './components/VoxettaSkipButton';

export class ViewContainer extends LitElement {
    static get properties() {
        return {
            view: {type: String},
            canRecord: {type: Boolean, attribute: 'can-record'},
            isRecording: {type: Boolean, attribute: 'is-recording'},
            audioStream: {type: Object, attribute: 'audio-stream'},
            user: {type: Object},
        };
    }

    static get styles() {
        return style;
    }

    constructor() {
        super();
    }

    /**
     * Renders the components associated with the collection view.
     * @return {HTML} The HTML template for the collection view.
     */
    renderCollectionView() {
        return html`
            <div id="collection-wrapper">
                <header class="top-level-component">
                    <div>
                        <vox-user-icon .userId=${this.user.id}> </vox-user-icon>
                    </div>

                    <!-- Hide progress when finished -->
                    ${this.canRecord &&
                    html`
                        <div class="progress">
                            <span>x of x</span>
                        </div>
                    `}

                    <div class="connection-status"></div>
                </header>
                <div class="prompts top-level-component">
                    <vox-prompts></vox-prompts>
                </div>

                <div id="feedback top-level-component">
                    <vox-sound-wave
                        .isRecording=${this.isRecording}
                        .audioStream=${this.audioStream}
                    >
                    </vox-sound-wave>
                </div>

                <!-- Hide recording when finished -->
                ${this.canRecord &&
                html` <div class="buttons top-level-component">
                    <div class="button-container"></div>
                    <div class="record-button-container">
                        <vox-record-button> </vox-record-button>
                    </div>
                    <div class="button-container">
                        <vox-skip-button> </vox-skip-button>
                    </div>
                </div>`}
            </div>
        `;
    }

    /**
     * Renders the components associated with the user form view.
     * @return {HTML} The HTML template for the user form view.
     */
    renderUserFormView() {
        return html`
            <vox-user-form
                .userId=${this.user.id}
                .gender=${this.user.gender}
                .userAge=${this.user.age}
                .deviceType=${this.user.deviceType}
            >
            </vox-user-form>
        `;
    }

    render() {
        let viewTemplate;

        switch (this.view) {
            case Views.COLLECTION:
                viewTemplate = html` ${this.renderCollectionView()} `;
                break;
            case Views.USER_FORM:
                viewTemplate = html` ${this.renderUserFormView()} `;
                break;
        }

        return viewTemplate;
    }
}

customElements.define('vox-view-container', ViewContainer);