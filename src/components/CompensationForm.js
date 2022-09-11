import { memo, useCallback, useState } from 'react';
import { FormControl, FormLabel, Avatar, Box, Select, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton, Stack, RadioGroup, Radio, Text } from "@chakra-ui/react";
import { NumberInput } from './NumberInputField';

import moment from 'moment';
import numeral from 'numeral';

import { AGE_VS_GROUP, DEPENDENTS_GROUPS, MULTIPLIER_AGE_GROUPS, SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE } from '../constants';


const findAgeMultiplier = age => MULTIPLIER_AGE_GROUPS.find(({ range }) => age >= range[0] && age <= range[1]).multiplier;
const getPSIncomeFactor = (age, occupation) => SALARY_TYPE_VS_AGE_GROUP_PERCENTAGE[occupation][AGE_VS_GROUP.find(({ range }) => age >= range[0] && age <= range[1]).id]


const BASE_YEAR = 2018;
const BASE_CONSORTIUM_AMOUNT = 40000;
const BASE_FUNERAL_COST = 15000;
const BASE_LOSS_TO_ESTATE = 15000;

const CompensationForm = () => {
    const [salary, setSalary] = useState(0);
    const [occupation, setOccupation] = useState('self-employeed');
    const [maritialStatus, setMaritialStatus] = useState('married');

    const [age, setAge] = useState(40);
    const [dependentsGroupRate, setDependentsGroupRate] = useState(DEPENDENTS_GROUPS[0].rate);
    const [consoritumFactor, setConsoritumFactor] = useState(1);

    const onSalaryChange = useCallback(value => {
        setSalary(Number(value))
    }, []);
    const onOccupationChange = useCallback(value => {
        setOccupation(value)
    }, []);
    const onMaritialStatusChange = useCallback(value => {
        setMaritialStatus(value);

    }, []);

    const onAgeChange = useCallback(value => setAge(Number(value)), []);
    const onDependentsGroupChange = useCallback(event => {
        setDependentsGroupRate(event.target.value)
    }, []);
    const onConsoritumChange = useCallback(value => setConsoritumFactor(Number(value)), []);


    const psIncome = Math.round(salary * 12 * getPSIncomeFactor(age, occupation) / 100);
    const totalIncome = salary * 12 + psIncome;
    const deductions = Math.round(totalIncome * (maritialStatus === 'unmarried' ? 0.5 : dependentsGroupRate));
    const multipliedIncome = (totalIncome - deductions) * findAgeMultiplier(age);
    const numOfYearFromBaseYear = (moment().format('YYYY') - BASE_YEAR);
    const incrementFactor = Math.pow(1.1, Math.floor(numOfYearFromBaseYear / 3));
    const consoritumAmount = Math.round(BASE_CONSORTIUM_AMOUNT * incrementFactor);
    const funeralCost = Math.round(BASE_FUNERAL_COST * incrementFactor);
    const lossToEstate = Math.round(BASE_LOSS_TO_ESTATE * incrementFactor);

    const totalCompensation = multipliedIncome + consoritumAmount * consoritumFactor + funeralCost + lossToEstate;

    return (
        <Box backgroundColor="#F7FAFC" paddingX={[0, 20, '25%', '30%']} paddingTop={[[0, 10, 10, 10]]}>
            <Stack direction="column" padding={10} spacing={5} backgroundColor="white" borderRadius="8" borderColor="gray.200" borderWidth={1}>
                <FormControl>
                    <FormLabel> Monthly Salary </FormLabel>
                    <NumberInput startEnhancerText="₹"
                        value={salary} onChange={onSalaryChange} placeholder="Please enter salary here" min={0} />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Yearly Salary </FormLabel>
                    <NumberInput startEnhancerText="₹" value={salary * 12} placeholder="Please enter salary here" min={0} disabled />
                </FormControl>

                <FormControl>
                    <FormLabel>Occupation </FormLabel>
                    <RadioGroup value={occupation} onChange={onOccupationChange} >
                        <Stack direction="row" spacing={8}>

                            <Radio value="self-employeed" >Self Employeed</Radio>
                            <Radio value="regular" > Regular </Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Maritial Status </FormLabel>
                    <RadioGroup value={maritialStatus} onChange={onMaritialStatusChange} >
                        <Stack direction="row" spacing={12}>

                            <Radio value="unmarried" >Unmarried</Radio>
                            <Radio value="married" > Married </Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Age </FormLabel>
                    <NumberInput value={age} onChange={onAgeChange} min={0} max={100} />
                </FormControl>
                <FormControl isDisabled={maritialStatus === 'unmarried'}>
                    <FormLabel>Number of Dependents</FormLabel>
                    <Select value={dependentsGroupRate} onChange={onDependentsGroupChange}>
                        {DEPENDENTS_GROUPS.map(({ label, id, rate }) => <option value={rate} key={id}>
                            {label}
                        </option>
                        )}
                    </Select>
                </FormControl>

                <Box display="flex" justifyContent="space-between">
                    <Box marginRight="20px">
                        <FormControl>
                            <FormLabel>Consortium Factor</FormLabel>
                            <NumberInput value={consoritumFactor} onChange={onConsoritumChange} placeholder="Consortium factor" min={1} />
                        </FormControl>
                    </Box>
                    <Box marginRight="0px">
                        <FormControl>
                            <FormLabel>Consortium Amount</FormLabel>
                            <NumberInput startEnhancerText="₹" value={consoritumAmount} placeholder="Consortium Amount" min={0} disabled />
                        </FormControl>
                    </Box>
                </Box>

                <FormControl isDisabled>
                    <FormLabel>Funeral</FormLabel>
                    <NumberInput startEnhancerText="₹" value={funeralCost} min={0} disabled />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Loss to Estate</FormLabel>
                    <NumberInput startEnhancerText="₹" value={lossToEstate} min={0} disabled />
                </FormControl>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    {`Total Compensation : ${numeral(totalCompensation).format('0,0')} ₹`}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign="left">
                            <Text>{`Annual PS Income : ${numeral(psIncome).format('0,0')} ₹`}</Text>
                            <Text >{`Annual Deductions : ${numeral(deductions).format('0,0')} ₹`}</Text>
                            <Text >{`Annual Multiplied Income : ${numeral(multipliedIncome).format('0,0')} ₹`}</Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

            </Stack>
            <Text marginTop={10} paddingBottom={10}> Chirag Shah District Judge</Text>

        </Box >

    );
}

export default memo(CompensationForm);
