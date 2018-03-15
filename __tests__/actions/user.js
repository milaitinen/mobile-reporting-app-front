import { insertUsername, insertPassword, insertToken } from '../../src/redux/actions/user';

describe('Test user actions',()=>{
    it('insertsUsername', () => {
        const insert = insertUsername('Heikki');
        expect(insert).toEqual({ type:'INSERT_USERNAME', username: 'Heikki' });
    });
    it('insertsPassword', () => {
        const insert = insertPassword('hwnm23m1');
        expect(insert).toEqual({ type:'INSERT_PASSWORD', password: 'hwnm23m1' });
    });
    it('insertsToken', () => {
        const insert = insertToken('fdsb342bjmnbfd82bjm');
        expect(insert).toEqual({ type:'INSERT_TOKEN', token: 'fdsb342bjmnbfd82bjm' });
    });
});