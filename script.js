/**
 * Função principal que agrupa anagramas
 * @param {string[]} words - Array de palavras para agrupar
 * @returns {string[][]} - Array de arrays com anagramas agrupados
 */
function groupAnagrams(words) {
  const anagramGroups = new Map();

  for (const word of words) {
    // Cria uma chave única para cada anagrama ordenando as letras
    const sortedWord = word.toLowerCase().split('').sort().join('');

    if (!anagramGroups.has(sortedWord)) {
      anagramGroups.set(sortedWord, []);
    }

    anagramGroups.get(sortedWord).push(word);
  }

  // Ordena cada grupo e depois ordena os grupos pelo primeiro elemento
  const result = Array.from(anagramGroups.values())
    .map(group => group.sort())
    .sort((a, b) => a[0].localeCompare(b[0]));

  return result;
}

/**
 * Processa a entrada do usuário e exibe o resultado
 */
function processInput() {
  const inputElement = document.getElementById('word-input');
  const resultElement = document.getElementById('result');
  const calculationElement = document.getElementById('calculation');

  // Limpa resultados anteriores
  resultElement.textContent = '';
  calculationElement.textContent = '';

  // Obtém e limpa a entrada
  const inputText = inputElement.value.trim();
  if (!inputText) {
    resultElement.textContent = 'Por favor, digite algumas palavras.';
    return;
  }

  // Divide as palavras e remove espaços extras
  const words = inputText
    .split(',')
    .map(word => word.trim())
    .filter(word => word.length > 0);

  if (words.length === 0) {
    resultElement.textContent = 'Nenhuma palavra válida encontrada.';
    return;
  }

  // Processa os anagramas
  const anagramGroups = groupAnagrams(words);

  // Exibe o resultado formatado
  resultElement.textContent = JSON.stringify(anagramGroups, null, 2);

  // Exibe o processo de cálculo
  calculationElement.textContent = `Processo:\n`;
  calculationElement.textContent += `1. Palavras recebidas: ${JSON.stringify(words)}\n`;
  calculationElement.textContent += `2. Criando chaves únicas ordenando as letras de cada palavra\n`;
  calculationElement.textContent += `3. Agrupando palavras com a mesma chave\n`;
  calculationElement.textContent += `4. Ordenando cada grupo e os grupos pelo primeiro elemento\n`;
  calculationElement.textContent += `5. Resultado final:`;
}

/**
 * Limpa os campos de entrada e resultado
 */
function clearFields() {
  document.getElementById('word-input').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('calculation').textContent = '';
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calculate-btn').addEventListener('click', processInput);
  document.getElementById('return-btn').addEventListener('click', clearFields);

  // Permite pressionar Enter para calcular
  document.getElementById('word-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      processInput();
    }
  });
});
