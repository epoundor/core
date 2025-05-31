import type { Meta, StoryObj } from '@storybook/vue3';
import Table from './Table.vue';

const meta = {
    title: 'Table',
    parameters: { layout: 'centered' },
    component: { ...Table }
} satisfies Meta<typeof Table>;

type TableStory = StoryObj<typeof Table>;

const data = new Array(4).fill({
    account: 'Afro Market 1',
    period: '25/05/22 -25/06/22',
    amount: '18 000'
});

export const Default = {
    args: {
        data,
        headers: [
            { field: 'account', label: 'Sous-compte' },
            { field: 'period', label: 'Période' },
            { field: 'amount', label: 'Montant (FCFA)' },
            { field: 'paidDate', label: 'Date de paiement' }
        ]
    }
} satisfies TableStory;

export default meta;
