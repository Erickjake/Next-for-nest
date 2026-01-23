import { logColor } from './log-color';

export async function asyncDelay(ms: number = 0, verbose = false) {
  if (ms <= 0) return;
  if (verbose) {
    logColor(`asyncDelay: Atraso simulado de ${ms / 1000}s iniciado`);
  }
  await new Promise(resolve => setTimeout(resolve, ms));
}
