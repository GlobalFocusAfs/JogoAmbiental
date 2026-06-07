# TODO: Desafios diários (1x/dia) e Impacto (5x/dia)

## Passos
1. [x] Atualizar o model `backend/models/User.js` para incluir controle diário de Impacto por tipo (árvore/reciclagem/caminhada), com data e contadores.
2. [x] Atualizar `backend/routes/user.js`:
   - [x] Implementar reset diário do Impacto ao detectar nova data.
   - [x] Implementar bloqueio quando o contador do tipo atingir 5 no dia.
3. [ ] Garantir que `completeChallenge` continue bloqueando corretamente por tipo 1x/dia (verificar normalização/guards).
4. [x] Atualizar `frontend/src/components/ImpactPanel.jsx` para desabilitar botões quando atingir 5 e exibir progresso.
5. [ ] Rodar testes manuais:
   - [ ] Concluir cada desafio diário 1 vez e validar erro na segunda tentativa no mesmo dia.
   - [ ] Marcar Impacto > 5 vezes no mesmo dia e validar bloqueio no 6º clique por tipo.
   - [ ] Simular troca de dia (verificando `toDateString`) e validar reset dos contadores.



