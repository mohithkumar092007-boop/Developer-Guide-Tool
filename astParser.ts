export interface ParsedSymbol {
  name: string;
  type: 'class' | 'function' | 'async_function' | 'endpoint' | 'model';
  lineStart: number;
  lineEnd: number;
  signature: string;
  complexity: string;
  concurrency: string;
  docstring: string;
}

export function parseSourceCodeAST(code: string, language: string): ParsedSymbol[] {
  const lines = code.split('\n');
  const symbols: ParsedSymbol[] = [];

  if (language.toLowerCase() === 'python' || language.toLowerCase() === 'py') {
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Class declaration
      if (trimmed.startsWith('class ')) {
        const match = trimmed.match(/^class\s+([A-Za-z0-9_]+)/);
        if (match) {
          symbols.push({
            name: match[1],
            type: 'class',
            lineStart: lineNum,
            lineEnd: Math.min(lineNum + 20, lines.length),
            signature: trimmed.replace(/:$/, ''),
            complexity: 'O(1)',
            concurrency: 'Asynchronous',
            docstring: 'Class declaration in Python AST module',
          });
        }
      }

      // Async function
      else if (trimmed.startsWith('async def ')) {
        const match = trimmed.match(/^async\s+def\s+([A-Za-z0-9_]+)\s*\((.*)\)/);
        if (match) {
          symbols.push({
            name: match[1],
            type: 'async_function',
            lineStart: lineNum,
            lineEnd: Math.min(lineNum + 15, lines.length),
            signature: trimmed.replace(/:$/, ''),
            complexity: 'O(1) Network I/O bound',
            concurrency: 'Asynchronous (async / await)',
            docstring: 'Asynchronous coroutine routine',
          });
        }
      }

      // Sync function
      else if (trimmed.startsWith('def ')) {
        const match = trimmed.match(/^def\s+([A-Za-z0-9_]+)\s*\((.*)\)/);
        if (match) {
          symbols.push({
            name: match[1],
            type: 'function',
            lineStart: lineNum,
            lineEnd: Math.min(lineNum + 10, lines.length),
            signature: trimmed.replace(/:$/, ''),
            complexity: 'O(1)',
            concurrency: 'Synchronous',
            docstring: 'Standard function procedure',
          });
        }
      }
    });
  } else {
    // JavaScript / TypeScript AST heuristics
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      if (trimmed.startsWith('export class ') || trimmed.startsWith('class ')) {
        const match = trimmed.match(/class\s+([A-Za-z0-9_]+)/);
        if (match) {
          symbols.push({
            name: match[1],
            type: 'class',
            lineStart: lineNum,
            lineEnd: Math.min(lineNum + 20, lines.length),
            signature: trimmed.replace(/{$/, ''),
            complexity: 'O(1)',
            concurrency: 'Component/Service Class',
            docstring: 'Exported class component',
          });
        }
      } else if (trimmed.startsWith('export async function ') || trimmed.startsWith('async function ')) {
        const match = trimmed.match(/async\s+function\s+([A-Za-z0-9_]+)/);
        if (match) {
          symbols.push({
            name: match[1],
            type: 'async_function',
            lineStart: lineNum,
            lineEnd: Math.min(lineNum + 15, lines.length),
            signature: trimmed.replace(/{$/, ''),
            complexity: 'O(1) I/O Bound',
            concurrency: 'Asynchronous',
            docstring: 'Async function handler',
          });
        }
      }
    });
  }

  return symbols;
}
