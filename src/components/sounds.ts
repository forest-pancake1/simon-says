
type soundName = 'tipe' | 'error' | 'click' | 'win';

const sounds = {
tipe: new Audio('sounds/tipe.mp3'),
error: new Audio('sounds/error.mp3'),
click: new Audio('sounds/click.mp3'),
win: new Audio('sounds/win.mp3')
} as const;


export function playSound(soundName: soundName): void{
 const sound = sounds[soundName];
 sound.currentTime = 0;
 sound.play().catch(e => console.error('ошибка воспроизведения звука', e));
}