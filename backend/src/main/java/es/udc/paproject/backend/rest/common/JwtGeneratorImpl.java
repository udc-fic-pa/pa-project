package es.udc.paproject.backend.rest.common;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

@Component
public class JwtGeneratorImpl implements JwtGenerator {

	@Value("${project.jwt.signKey}")
	private String signKey;

	@Value("${project.jwt.expirationMinutes}")
	private long expirationMinutes;

	@Override
	public String generate(JwtInfo info) {

		try {

			JWTClaimsSet claims = new JWTClaimsSet.Builder()
				.claim("userId", info.userId())
				.claim("role", info.role())
				.expirationTime(new Date(System.currentTimeMillis() + expirationMinutes * 60 * 1000))
				.build();

			SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claims);

			signedJWT.sign(new MACSigner(signKey));

			return signedJWT.serialize();

		} catch (JOSEException e) {
			throw new RuntimeException(e);
		}

	}

	@Override
	public JwtInfo getInfo(String token) {

		try {

			// Verify signature.
			SignedJWT signedJWT = SignedJWT.parse(token);

			if (!signedJWT.verify(new MACVerifier(signKey))) {
				throw new RuntimeException("Invalid JWT signature");
			}

			JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

			// Verify expiration date.
			if (claims.getExpirationTime() == null ||
					claims.getExpirationTime().before(new Date())) {
				throw new RuntimeException("JWT token expired");
			}

			return new JwtInfo(
				((Number) claims.getClaim("userId")).longValue(),
				(String) claims.getClaim("role"));

		} catch (java.text.ParseException | JOSEException e) {
			throw new RuntimeException(e);
		}

	}

}

