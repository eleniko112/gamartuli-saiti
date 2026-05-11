/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChaosProvider } from './components/ChaosProvider';
import AppContent from './AppContent';

export default function App() {
  return (
    <ChaosProvider>
      <AppContent />
    </ChaosProvider>
  );
}
