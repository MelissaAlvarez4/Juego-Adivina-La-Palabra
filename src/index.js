import './styles.css'
import words from './dictionary.js'

window.onload = ()=> {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log('page is fully loaded');
    console.log(randomWord)
}