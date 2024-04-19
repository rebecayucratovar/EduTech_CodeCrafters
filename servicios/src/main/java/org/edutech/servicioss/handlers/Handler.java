package org.edutech.servicioss.handlers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class Handler extends ResponseEntityExceptionHandler {
  @ExceptionHandler(value = {IllegalArgumentException.class})
  protected ResponseEntity<Object> handleMyException(IllegalArgumentException exception, WebRequest request) {
    var response = ErrorResponse.builder().message(exception.getMessage()).statusCode(HttpStatus.BAD_REQUEST.value()).build();

    return handleExceptionInternal(exception, response, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
  }
}
