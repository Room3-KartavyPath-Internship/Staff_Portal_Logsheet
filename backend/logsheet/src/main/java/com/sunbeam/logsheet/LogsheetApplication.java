package com.sunbeam.logsheet;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
public class LogsheetApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogsheetApplication.class, args);
	}
	
	
	@Bean // equivalent to <bean id ..../> in xml file
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
	    .setPropertyCondition(Conditions.isNotNull());
		return modelMapper;
	}
	
	@Configuration
	public class OpenAPIConfig {
	  @Bean
	  public OpenAPI myOpenAPI() {
	    return new OpenAPI()
	      .info(new Info().title("My API").version("1.0").description("Description"));
	  }
	}


}


