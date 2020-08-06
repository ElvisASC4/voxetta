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

import {css} from 'lit-element';

export default css`
    #prompt-screen {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        text-align: center;
    }

    p {
        margin: 0 auto;
        max-width: 70vw;

        font-size: 44px;
        color: black;
    }

    img {
        max-height: 400px;
    }

    .loading-text {
        opacity: 0.5;
    }
    mwc-icon {
        margin-bottom: 20px;

        --mdc-icon-size: 48px;
    }

    .finished-icon {
        color: #34a853;
    }
    .failed-icon {
        color: #ea4335;
    }

    /* Prompt reset button  */

    button {
        background-color: white;
        border: none;
        color: #a0a0a0;
        cursor: pointer;
    }

    button:hover {
        background-color: #dcdcdc;
    }
`;
