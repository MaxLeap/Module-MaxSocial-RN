jest.unmock('../lib/ml.react-native');

describe('create object', ()=>{
    it('create an object should has object id', () => {
        require('../lib/ml.react-native');
        var GamePlayer = ML.Object.extend('GamePlayer');
        var player1 = new GamePlayer();
        player1.set('name',"马化腾");
        player1.set('score',10);
        player1.set('isMale',false);
        expect(player1.get('name')).toBe('马化腾');
    });
});
