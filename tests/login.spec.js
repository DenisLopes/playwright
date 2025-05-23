import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/loginPage';
import { DashPage } from '../pages/DashPage';

test('Verificação em duas etapas invalida', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.acessarPagina();
  await loginPage.informarCpf(usuario.cpf);
  await loginPage.informarSenha(usuario.senha);
  await loginPage.informar2FA('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Realizar login com sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const usuario = {
    cpf: '00000014141',
    senhaVerificacao: '147258'
  }

  await loginPage.acessarPagina();
  await loginPage.informarCpf(usuario.cpf);
  await loginPage.informarSenha(usuario.senhaVerificacao);

  await page.waitForTimeout(3000)
  const code = await obterCodigo2FA();

  loginPage.informar2FA(code)

  await page.waitForTimeout(2000)

  expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')
});