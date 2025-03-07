package com.telemed.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private final String fromPhoneNumber;

    public SmsService(
            @Value("${twilio.account-sid}") String accountSid,
            @Value("${twilio.auth-token}") String authToken,
            @Value("${twilio.phone-number}") String fromPhoneNumber) {

        this.fromPhoneNumber = fromPhoneNumber;

        // Initialize Twilio using Spring config values
        Twilio.init(accountSid, authToken);
    }

    public void sendSms(String to, String message) {
        try {
            Message sms = Message.creator(
                    new PhoneNumber(to),
                    new PhoneNumber(fromPhoneNumber),
                    message
            ).create();

            System.out.println("📲 SMS sent successfully! SID: " + sms.getSid());

        } catch (Exception e) {
            System.err.println("❌ Failed to send SMS: " + e.getMessage());
            throw e;
        }
    }
}
