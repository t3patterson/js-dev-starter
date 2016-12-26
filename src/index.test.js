import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', ()=>{
   it('should pass', ()=>{
      expect(true).to.equal(true)
   });
});

describe('index.html copy', ()=>{
   it('should say "hello"', (done)=>{
      const index = fs.readFileSync('./src/index.html', 'utf-8')
      jsdom.env(index, function(err, vWindow){
         const h1 = vWindow.document.getElementsByTagName('h1')[0];
         expect(h1.innerHTML).to.equal("Halllllooo baby shamppoo")
         done();
         vWindow.close()
      })
   })
})
