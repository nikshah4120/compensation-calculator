import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box
} from '@chakra-ui/react'


const NumberInputFormField = ({ value, onChange, placeholder, min, max, startEnhancerText }) => (
    <Box display="flex">
        {startEnhancerText ? <Box marginTop={2} marginRight={2}>{startEnhancerText}</Box> : null}
        <NumberInput flex="1" value={value} min={min} onChange={onChange} max={max} placeholder={placeholder}>

            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>

        </NumberInput>
    </Box>
);

export { NumberInputFormField as NumberInput };