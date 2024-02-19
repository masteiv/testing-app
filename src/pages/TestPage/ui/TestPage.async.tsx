import React from 'react';

export const TestPageAsync = React.lazy(async () => await import('./TestPage'));
