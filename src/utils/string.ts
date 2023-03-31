export function fMoney(unit : number) {
    const n = Number(unit);
    if (isNaN(n)) throw new Error('Unit is an invalid format');



    return (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(n));
}