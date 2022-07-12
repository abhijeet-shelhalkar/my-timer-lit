var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/* playground-fold */
import { play, pause, replay } from './icons.js';
/* playground-fold-end */
let MyTimer = class MyTimer extends LitElement {
    constructor() {
        super(...arguments);
        this.duration = 60;
        this.end = null;
        this.remaining = 0;
    }
    static { this.styles = css `/* playground-fold */

    :host {
      display: inline-block;
      min-width: 4em;
      text-align: center;
      padding: 0.2em;
      margin: 0.2em 0.1em;
    }
    footer {
      user-select: none;
      font-size: 0.6em;
    }
    /* playground-fold-end */`; }
    render() {
        const { remaining, running } = this;
        const min = Math.floor(remaining / 60000);
        const sec = pad(min, Math.floor(remaining / 1000 % 60));
        const hun = pad(true, Math.floor(remaining % 1000 / 10));
        return html `
      ${min ? `${min}:${sec}` : `${sec}.${hun}`}
      <footer>
        ${remaining === 0 ? '' : running ?
            html `<span @click=${this.pause}>${pause}</span>` :
            html `<span @click=${this.start}>${play}</span>`}
        <span @click=${this.reset}>${replay}</span>
      </footer>
    `;
    }
    /* playground-fold */
    start() {
        this.end = Date.now() + this.remaining;
        this.tick();
    }
    pause() {
        this.end = null;
    }
    reset() {
        const running = this.running;
        this.remaining = this.duration * 1000;
        this.end = running ? Date.now() + this.remaining : null;
    }
    tick() {
        if (this.running) {
            this.remaining = Math.max(0, this.end - Date.now());
            requestAnimationFrame(() => this.tick());
        }
    }
    get running() {
        return this.end && this.remaining;
    }
    connectedCallback() {
        super.connectedCallback();
        this.reset();
    } /* playground-fold-end */
};
__decorate([
    property({ type: Number })
], MyTimer.prototype, "duration", void 0);
__decorate([
    state()
], MyTimer.prototype, "end", void 0);
__decorate([
    state()
], MyTimer.prototype, "remaining", void 0);
MyTimer = __decorate([
    customElement("my-timer")
], MyTimer);
export { MyTimer };
/* playground-fold */
function pad(pad, val) {
    return pad ? String(val).padStart(2, '0') : val;
} /* playground-fold-end */
//# sourceMappingURL=my-timer.js.map