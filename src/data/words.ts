/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WordType = 'aguda' | 'grave' | 'esdrújula';

export interface WordData {
  text: string;
  type: WordType;
  difficulty: 1 | 2 | 3;
}

export const WORDS: WordData[] = [
  // Round 1 - Basic (Difficulty 1)
  { text: 'CAFÉ', type: 'aguda', difficulty: 1 },
  { text: 'ÁRBOL', type: 'grave', difficulty: 1 },
  { text: 'MÚSICA', type: 'esdrújula', difficulty: 1 },
  { text: 'CAMIÓN', type: 'aguda', difficulty: 1 },
  { text: 'CASA', type: 'grave', difficulty: 1 },
  { text: 'PÁJARO', type: 'esdrújula', difficulty: 1 },
  { text: 'AZÚCAR', type: 'grave', difficulty: 1 },
  { text: 'RATÓN', type: 'aguda', difficulty: 1 },
  { text: 'LÁPIZ', type: 'grave', difficulty: 1 },
  { text: 'PLÁTANO', type: 'esdrújula', difficulty: 1 },
  
  // Round 2 - Medium (Difficulty 2)
  { text: 'RELOJ', type: 'aguda', difficulty: 2 },
  { text: 'CÁRCEL', type: 'grave', difficulty: 2 },
  { text: 'TELÉFONO', type: 'esdrújula', difficulty: 2 },
  { text: 'PARED', type: 'aguda', difficulty: 2 },
  { text: 'DORMIR', type: 'aguda', difficulty: 2 },
  { text: 'EXAMEN', type: 'grave', difficulty: 2 },
  { text: 'PELÍCULA', type: 'esdrújula', difficulty: 2 },
  { text: 'DÉBIL', type: 'grave', difficulty: 2 },
  { text: 'COMPÁS', type: 'aguda', difficulty: 2 },
  { text: 'SÁBADO', type: 'esdrújula', difficulty: 2 },

  // Round 3 - Hard (Difficulty 3)
  { text: 'FELICIDAD', type: 'aguda', difficulty: 3 },
  { text: 'VOLUMEN', type: 'grave', difficulty: 3 },
  { text: 'BRÚJULA', type: 'esdrújula', difficulty: 3 },
  { text: 'CAPITÁN', type: 'aguda', difficulty: 3 },
  { text: 'DIFÍCIL', type: 'grave', difficulty: 3 },
  { text: 'RÁPIDO', type: 'esdrújula', difficulty: 3 },
  { text: 'CRISTAL', type: 'aguda', difficulty: 3 },
  { text: 'MÓVIL', type: 'grave', difficulty: 3 },
  { text: 'SÍLABA', type: 'esdrújula', difficulty: 3 },
  { text: 'AMISTAD', type: 'aguda', difficulty: 3 },
];
