package com.nubbymedia.scmsp;

import com.nubbymedia.scmsp.config.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ScmspApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScmspApplication.class, args);
    }
}
