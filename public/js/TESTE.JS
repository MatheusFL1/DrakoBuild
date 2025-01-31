//SELECIONAR KIT

if(framerate === '60'){
    kit = 'low'
}else  if(framerate === '144') {
    if(gamemode === 'singleplayer'){
        kit = 'medium'
    }else{
        kit = 'high'
    }
}else{
    kit = 'enthusiastic'
}

//SELECIONAR PLACA DE VIDEO

if(kit === 'low'){
    if(resolution === 'fullhd'){
        placavideo = 'low'
    } else if (resolution === '2k'){
        placavideo = 'medium'
    } else if (resolution === '4k'){
        placavideo = 'high'
    }
} 

if(kit === 'medium'){
    if(resolution === 'fullhd' && quality === 'min' ||  quality === 'med'){
        placavideo = 'medium'
    } else if (resolution === 'fullhd' && quality === 'max'){
        placavideo = 'high'
    } else if (resolution === '2k' && quality === 'min' ||  quality === 'med'){
        placavideo = 'high'
    } else if(resolution === '2k' && quality === 'max'){
        placavideo = 'highend'
    } else if (resolution === '4k' && quality === 'min' || quality === 'med') {
        placavideo = 'highend'
    } else (placavideo = 'enthusiastic')
} 

if(kit === 'high'){
    if(resolution === 'fullhd'){
        placavideo = 'medium'
    } else {
        placavideo = 'high'
    }
}

if(kit === 'enthusiastic'){
    if(resolution === 'fullhd'){
        placavideo = 'high'
    } else {
        placavideo = 'highend'
    }
}

