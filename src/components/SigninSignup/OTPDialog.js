import React, { useState } from 'react';
import { TextField, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { validateOTP } from '../../apis/axiosRequest';

const OTPDialog = ({ email, onClose, onValidate }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleValidate = async () => {
        try {
            const response = await validateOTP(email, otp, "EMAILVERIFICATION");

            // Handle success
            if (response?.status === 200 && response?.data?.success) {
                onValidate(true); // Notify parent about successful validation
                onClose();
            } else {
                // Handle unexpected status or validation failure
                const errorMessage = response?.data?.message || "Something went wrong. Please try again.";
                setError(errorMessage);
            }
        } catch (err) {
            // Handle error response
            const userFriendlyMessage = err?.response?.data?.message || "Unable to validate OTP. Please try again.";
            setError(userFriendlyMessage);
        }
    };

    return (
        <>
            <DialogTitle>Verify Email</DialogTitle>
            <DialogContent>
                <p>Enter the OTP sent to {email}</p>
                <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleValidate} color="primary">Verify</Button>
            </DialogActions>
        </>
    );
};

export default OTPDialog;
