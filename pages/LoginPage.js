export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async acessarPagina() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informarCpf(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informarSenha(senha) {
        for (const digito of senha) {
            await this.page.getByRole('button', { name: digito }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informar2FA(code) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

}