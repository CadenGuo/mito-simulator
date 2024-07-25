export const getDailyBasePoints = (totalDeposit: number) => {
  return 2400 * totalDeposit;
};

export const getReferrerBoost = () => {
  return 1.2;
};

export const getXBoost = (xConnected: boolean) => {
  return xConnected ? 1.1 : 1;
};

export const getWelcomeBoost = (referralCodeApplied: boolean) => {
  return referralCodeApplied ? 1.15 : 1;
};

export const getMorseBoost = (haveMorse: boolean) => {
  return haveMorse ? 1.3 : 1;
};

export const getBracketBoost = (totalDeposit: number) => {
  if (totalDeposit >= 1 && totalDeposit < 1) {
    return 1.1;
  } else if (totalDeposit >= 1 && totalDeposit < 3) {
    return 1.1;
  } else if (totalDeposit >= 3 && totalDeposit < 5) {
    return 1.15;
  } else if (totalDeposit >= 5 && totalDeposit < 10) {
    return 1.2;
  } else if (totalDeposit >= 10 && totalDeposit < 25) {
    return 1.25;
  } else if (totalDeposit >= 25 && totalDeposit < 40) {
    return 1.3;
  } else if (totalDeposit >= 40 && totalDeposit < 55) {
    return 1.35;
  } else if (totalDeposit >= 55 && totalDeposit < 100) {
    return 1.5;
  } else if (totalDeposit >= 100 && totalDeposit < 200) {
    return 1.7;
  } else if (totalDeposit >= 200 && totalDeposit < 500) {
    return 1.8;
  } else if (totalDeposit >= 500 && totalDeposit < 1000) {
    return 1.9;
  } else if (totalDeposit > 1000) {
    return 2;
  }
  return 1;
};

export const getHoldingDurationBoost = (holdingDays: number) => {
  return 1 + holdingDays * 0.007;
};

export const getTestnetBoost = (tier: string) => {
  if (tier === 'bronze') {
    return 1;
  } else if (tier === 'silver') {
    return 1.1;
  } else if (tier === 'gold') {
    return 1.15;
  } else if (tier === 'platinum') {
    return 1.3;
  } else if (tier === 'diamond') {
    return 1.5;
  }
  return 1;
};

export const getEigenlayerBoost = (eigenlayerPoints: number) => {
  if (eigenlayerPoints >= 100 && eigenlayerPoints < 500) {
    return 1.05;
  } else if (eigenlayerPoints >= 500 && eigenlayerPoints < 1000) {
    return 1.1;
  } else if (eigenlayerPoints >= 1000 && eigenlayerPoints < 5000) {
    return 1.15;
  } else if (eigenlayerPoints >= 5000 && eigenlayerPoints < 10000) {
    return 1.2;
  } else if (eigenlayerPoints >= 10000 && eigenlayerPoints < 50000) {
    return 1.3;
  } else if (eigenlayerPoints >= 50000 && eigenlayerPoints < 100000) {
    return 1.4;
  } else if (eigenlayerPoints >= 100000 && eigenlayerPoints < 200000) {
    return 1.5;
  } else if (eigenlayerPoints >= 200000) {
    return 1.6;
  }

  return 1;
};
