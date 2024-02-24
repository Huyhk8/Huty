/* global api */
class enen_Vocabulary{
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
    }

    async displayName() {
        return 'Longman EN->EN Dictionary';
    }


    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        let list = [word]
        let promises = list.map((item) => this.findLongman(item));
        let results = await Promise.all(promises);
        return [].concat(...results).filter(x => x);
    }

    async findLongman(word) {
        const maxexample = this.maxexample;
        let notes = [];

        if (!word) return notes;
        
        const base = 'https://www.ldoceonline.com/dictionary/';
        const url = base + encodeURIComponent(word);
        let doc = '';
        try {
            let data = await api.fetch(url);
            let parser = new DOMParser();
            doc = parser.parseFromString(data, "text/html");
        } catch (err) {
            return null;
        }
        
        let ipa = doc.querySelectorAll('.ipa-se');
        ipa = ipa.length > 0 ? `/${ipa[0].textContent}/` : '';
        let audios = [];
        audios[0] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`;
        audios[1] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`;

        let definitions = [];
        let items = doc.querySelectorAll('.entry');
        for (const item of items) {
            let definition = '';
            let pos = item.querySelector('.POS');
            pos = pos ? `<span class="pos">${pos.textContent}</span>` : '';
            let sense = item.querySelector('.sense');
            if (!sense) continue;
            let eng_tran = sense.querySelector('.DEF');
            eng_tran = eng_tran ? `<span class="eng_tran">${eng_tran.textContent.replace(RegExp(word, 'gi'),`<b>${word}</b>`)}</span>` : '';
            definition = `${pos}<span class="tran">${eng_tran}</span>`;

            // make exmaple sentence segement
            let examples = sense.querySelectorAll('.EXAMPLE');
            if (examples && examples.length > 0 && maxexample > 0) {
                definition += '<ul class="sents">';
                for (const [idx, ex] of examples.entries()) {
                    if (idx > maxexample - 1) break; // to control only n example sentences defined in option.
                    let eng_sent = ex.textContent.replace(RegExp(word, 'gi'),`<b>${word}</b>`);
                    definition += `<li class='sent'><span class='eng_sent'>${eng_sent}</span></li>`;
                }
                definition += '</ul>';
            }
            definition && definitions.push(definition);
        }

        let css = this.renderCSS();
        notes.push({
            css,
            expression: word,
            reading: ipa,
            definitions,
            audios
        });
        return notes;
    }

    renderCSS() {
        let css = `
            <style>
                span.star {color: #FFBB00;}
                span.pos {color: #1673E6;}
                span.tran {color: #507C3A;}
                span.eng_tran {color: #507C3A;}
                span.chn_tran {color: #507C3A;}
                span.grammar {color: #1673E6;}
                span.eg {color: #507C3A;}
                span.eng_sent {color: #507C3A;}
                span.chn_sent {color: #507C3A;}
                span.complement {color: #507C3A;}
                span.head {color: #1673E6;}
                span.content {color: #507C3A;}
                span.meaning {color: #507C3A;}
                span.footnote {color: #507C3A;}
                span.label {color: #1673E6;}
                span.symbol {color: #1673E6;}
                span.form {color: #1673E6;}
                span.informal {color: #1673E6;}
                span.title {color: #1673E6;}
                span.number {color: #1673E6;}
                span.subentry {color: #1673E6;}
                span.topic {color: #1673E6;}
                span.usage {color: #1673E6;}
                span.idiom {color: #1673E6;}
                span.phrase {color: #1673E6;}
                span.sense {color: #1673E6;}
                span.synonym {color: #1673E6;}
                span.antonym {color: #1673E6;}
                span.thesaurus {color: #1673E6;}
                span.example {color: #507C3A;}
                span.variant {color: #1673E6;}
                span.origin {color: #507C3A;}
                span.pron {color: #1673E6;}
                span.ipa {color: #1673E6;}
                span.audio {color: #1673E6;}
                span.freq {color: #1673E6;}
                span.collins {color: #1673E6;}
                span.longman {color: #1673E6;}
                span.oxford {color: #1673E6;}
                span.webster {color: #1673E6;}
                span.macmillan {color: #1673E6;}
                span.ahd {color: #1673E6;}
                span.wordnet {color: #1673E6;}
                span.wiktionary {color: #1673E6;}
                span.etymonline {color: #1673E6;}
                span.urban {color: #1673E6;}
                span.google {color: #1673E6;}
                span.wikipedia {color: #1673E6;}
                span.youtube {color: #1673E6;}
                span.baidu {color: #1673E6;}
                span.zdic {color: #1673E6;}
                span.moedict {color: #1673E6;}
                span.jukuu {color: #1673E6;}
                span.bingdict {color: #1673E6;}
                span.youdao {color: #1673E6;}
                span.iciba {color: #1673E6;}
                span.hjdict {color: #1673E6;}
                span.cjdict {color: #1673E6;}
                span.grammarly {color: #1673E6;}
                span.reverso {color: #1673E6;}
                span.linguee {color: #1673E6;}
                span.deepl {color: #1673E6;}
                span.translate {color: #1673E6;}
                span.amazon {color: #1673E6;}
                span.ebay {color: #1673E6;}
                span.taobao {color: #1673E6;}
                span.jd {color: #1673E6;}
                span.douban {color: #1673E6;}
                span.imdb {color: #1673E6;}
                span.netflix {color: #1673E6;}
                span.spotify {color: #1673E6;}
                span.soundcloud {color: #1673E6;}
                span.instagram {color: #1673E6;}
                span.facebook {color: #1673E6;}
                span.twitter {color: #1673E6;}
                span.weibo {color: #1673E6;}
                span.wechat {color: #1673E6;}
                span.line {color: #1673E6;}
                span.whatsapp {color: #1673E6;}
                span.telegram {color: #1673E6;}
                span.discord {color: #1673E6;}
                span.reddit {color: #1673E6;}
                span.quora {color: #1673E6;}
                span.stackoverflow {color: #1673E6;}
                span.github {color: #1673E6;}
                span.gitlab {color: #1673E6;}
                span.bitbucket {color: #1673E6;}
                span.codepen {color: #1673E6;}
                span.jsfiddle {color: #1673E6;}
                span.glitch {color: #1673E6;}
                span.heroku {color: #1673E6;}
                span.netlify {color: #1673E6;}
                span.vercel {color: #1673E6;}
                span.npm {color: #1673E6;}
                span.yarn {color: #1673E6;}
                span.pypi {color: #1673E6;}
                span.rubygems {color: #1673E6;}
                span.cocoapods {color: #1673E6;}
                span.nuget {color: #1673E6;}
                span.wordpress {color: #1673E6;}
                span.drupal {color: #1673E6;}
                span.joomla {color: #1673E6
