import { memo, useCallback, useState } from 'react';
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { Select } from "baseui/select";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { LabelLarge, LabelMedium } from "baseui/typography";

import { AGE_VS_GROUP, DEPENDENTS_GROUPS, MULTIPLIER_AGE_GROUPS, SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE } from '../constants';


const findAgeMultiplier = age => MULTIPLIER_AGE_GROUPS.find(({ range }) => age >= range[0] && age <= range[1]).multiplier;
const getPSIncomeFactor = (age, occupation) => SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE[occupation][AGE_VS_GROUP.find(({ range }) => age >= range[0] && age <= range[1]).id]

const RADIO_OVERRIDES = {
    Root: {
        style: {
            flex: 1,
        }
    }
};

const CompensationForm = () => {
    const [salary, setSalary] = useState(0);
    const [occupation, setOccupation] = useState('self-employeed');
    const [age, setAge] = useState(40);
    const [dependentsGroup, setDependentsGroup] = useState([DEPENDENTS_GROUPS[0]]);
    const [consoritumFactor, setConsoritumFactor] = useState(1);
    const [consoritumAmount, setConsoritumAmount] = useState(40000);
    const [funeralCost, setFuneralCost] = useState(15000);
    const [lossToEstate, setLossToEstate] = useState(15000);

    const onSalaryChange = useCallback(e => setSalary(Number(e.target.value)), []);
    const onOccupationChange = useCallback(e => setOccupation(e.currentTarget.value), []);
    const onAgeChange = useCallback(e => setAge(Number(e.target.value)), []);
    const onDependentsGroupChange = useCallback(params => setDependentsGroup(params.value), []);
    const onConsoritumChange = useCallback(e => setConsoritumFactor(Number(e.target.value)), []);
    const onConsoritumAmountChange = useCallback(e => setConsoritumAmount(Number(e.target.value)), []);
    const onFuneralCostChange = useCallback(e => setFuneralCost(Number(e.target.value)), []);
    const onLossToEstateChange = useCallback(e => setLossToEstate(Number(e.target.value)), []);


    const psIncome = Math.round(salary * 12 * getPSIncomeFactor(age, occupation) / 100);
    const totalIncome = salary * 12 + psIncome;
    const deductions = Math.round(totalIncome * dependentsGroup[0].rate);
    const multipliedIncome = (totalIncome - deductions) * findAgeMultiplier(age);
    const totalCompensation = multipliedIncome + consoritumAmount * consoritumFactor + funeralCost + lossToEstate;


    return (
        <Block display="flex" flexDirection="column" marginLeft="30%" marginRight="30%" marginTop="8px">
            <FormControl label="Monthly Salary" htmlFor="salary">
                <Input id="salary" value={salary} onChange={onSalaryChange} placeholder="Please enter salary here" type="number" min={0} />
            </FormControl>
            <FormControl label="Yearly Salary" htmlFor="salary">
                <Input id="salary" value={salary * 12} placeholder="Please enter salary here" type="number" min={0} disabled />
            </FormControl>

            <FormControl label="Occupation" htmlFor="occupation">
                <RadioGroup value={occupation} onChange={onOccupationChange} align={ALIGN.horizontal} >
                    <Radio value="self-employeed" overrides={RADIO_OVERRIDES}>Self Employeed</Radio>
                    <Radio value="regular" overrides={RADIO_OVERRIDES}> Regular </Radio>
                </RadioGroup>
            </FormControl>
            <FormControl label="Age" htmlFor="age">
                <Input id="age" value={age} onChange={onAgeChange} type="number" min={0} max={100} />
            </FormControl>
            <FormControl label="Number of Dependents" htmlFor="dependents">
                <Select options={DEPENDENTS_GROUPS} id="age" value={dependentsGroup} onChange={onDependentsGroupChange} />
            </FormControl>
            <Block display="flex" justifyContent="space-between">
                <Block marginRight="20px">
                    <FormControl label="Consortium Factor" htmlFor="consortium factor">
                        <Input id="consortium factor" value={consoritumFactor} onChange={onConsoritumChange} placeholder="Consortium factor" type="number" min={1} />
                    </FormControl>
                </Block>
                <Block marginRight="0px">
                    <FormControl label="Consortium Amount" htmlFor="consortium amount">
                        <Input id="consortium amount" value={consoritumAmount} onChange={onConsoritumAmountChange} placeholder="Consortium Amount" type="number" min={0} />
                    </FormControl>
                </Block>
            </Block>
            <FormControl label="Funeral" htmlFor="funeral">
                <Input id="funeral" value={funeralCost} onChange={onFuneralCostChange} type="number" min={0} />
            </FormControl>
            <FormControl label="Loss to Estate" htmlFor="l2e">
                <Input id="l2e" value={lossToEstate} onChange={onLossToEstateChange} type="number" min={0} />
            </FormControl>
            <LabelLarge marginTop="24px" marginBottom="24px">{`Total Compensation : ${totalCompensation}`}</LabelLarge>
            <LabelMedium >{`Annual PS Income : ${psIncome}`}</LabelMedium>
            <LabelMedium>{`Annual Deductions : ${deductions}`}</LabelMedium>
            <LabelMedium marginBottom="24px">{`Annual Multiplied Income : ${multipliedIncome}`}</LabelMedium>
            <LabelMedium marginBottom="24px">Chirag Shah, District Judge</LabelMedium>
        </Block>
    );
}

export default memo(CompensationForm);
