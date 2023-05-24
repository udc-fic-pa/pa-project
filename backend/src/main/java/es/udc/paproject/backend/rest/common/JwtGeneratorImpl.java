package es.udc.paproject.backend.rest.common;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtGeneratorImpl implements JwtGenerator {
	
	@Value("${project.jwt.signKey}")
	private String signKey;
	
	@Value("${project.jwt.expirationMinutes}")
	private long expirationMinutes;

	@Override
	public String generate(JwtInfo info) {

		return Jwts.builder()
			.claim("userId", info.getUserId())
			.claim("role", info.getRole())
			.setExpiration(new Date(System.currentTimeMillis() + expirationMinutes*60*1000))
			.signWith(Keys.hmacShaKeyFor(signKey.getBytes()), SignatureAlgorithm.HS256)
			.compact();

	}

	@Override
	public JwtInfo getInfo(String token) {
		
		Claims claims = Jwts.parserBuilder()
	        .setSigningKey(signKey.getBytes())
			.build()
	        .parseClaimsJws(token)
	        .getBody();
		
		return new JwtInfo(
			((Integer) claims.get("userId")).longValue(), 
			claims.getSubject(), 
			(String) claims.get("role"));
		
	}

}
