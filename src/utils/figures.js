import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 20);

const figures = {
    bishop_black: {
        url: '/images/bishop_black.png',
        color: 'black',
        id: nanoid(),
        name: 'bishop',
    },
    bishop_white: {
        url: '/images/bishop_white.png',
        color: 'white',
        id: nanoid(),
        name: 'bishop',
    },
    king_white: {
        url: '/images/king_white.png',
        color: 'white',
        id: nanoid(),
        name: 'king'
    },
    king_black: {
        url: '/images/king_black.png',
        color: 'black',
        id: nanoid(),
        name: 'king'
    },
    knight_black: {
        url: '/images/knight_black.png',
        color: 'black',
        id: nanoid(),
        name: 'knight'
    },
    knight_white: {
        url: '/images/knight_white.png',
        color: 'white',
        id: nanoid(),
        name: 'knight',
    },
    pawn_black: {
        url: '/images/pawn_black.png',
        color: 'black',
        id: nanoid(),
        name: 'pawn',
        
    },
    pawn_white: {
        url: '/images/pawn_white.png',
        color: 'white',
        id: nanoid(),
        name: 'pawn',
    },
    queen_black: {
        url: '/images/queen_black.png',
        color: 'black',
        id: nanoid(),
        name: 'queen',
    },
    queen_white: {
        url: '/images/queen_white.png',
        color: 'white',
        id: nanoid(),
        name: 'queen',
    },
    rook_black: {
        url: '/images/rook_black.png',
        color: 'black',
        id: nanoid(),
        name: 'rook',
    },
    rook_white: {
        url: '/images/rook_white.png',
        color: 'white',
        id: nanoid(),
        name: 'rook',
    }
}

export default figures;
